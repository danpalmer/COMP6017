/*
    Route handler for the root URL.

    If the content type accepted by the client is JSON or JSON HAL, then
    we return a list of links to valid endpoints that can be accessed from here:
    /user and /question.

    If the content type is not one of these, then we assume that it is being requested
    by a web browser or something other than an API client, and we return the README
    for the project rendered from Markdown to HTML.
*/
var markdown = require('marked');
var fs = require('fs');

markdown.setOptions({
    gfm: true
});

// Style taken from https://github.com/revolunet/sublimetext-markdown-preview, under the MIT licence.
var style = "<style>body{font-size:15px;line-height:1.7;overflow-x:hidden;background-color:white;border-radius:3px;border:3px solid #EEE;box-shadow:inset 0 0 0 1px #cecece;font-family:Helvetica,arial,freesans,clean,sans-serif;width:912px;padding:30px;margin:2em auto;color:#333}.body-classic{color:#444;font-family:Georgia,Palatino,'Palatino Linotype',Times,'Times New Roman','Hiragino Sans GB','STXihei','微软雅黑',serif;font-size:16px;line-height:1.5em;background:#fefefe;width:45em;margin:10px auto;padding:1em;outline:1300px solid #fafafa}body>:first-child{margin-top:0 !important}body>:last-child{margin-bottom:0 !important}blockquote,dl,ol,p,pre,table,ul{border:0;margin:15px 0;padding:0}body a.absent{color:#c00}body a.anchor{display:block;padding-left:30px;margin-left:-30px;cursor:pointer;position:absolute;top:0;left:0;bottom:0}.octicon{font:normal normal 16px sans-serif;width:1em;height:1em;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.octicon-link{background:url(\"data:image/svg+xml;utf8,<?xmlversion='1.0'standalone='no'?><!DOCTYPEsvgPUBLIC'-//W3C//DTDSVG1.1//EN''http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svgxmlns='http://www.w3.org/2000/svg'viewBox='001024832'><metadata>Copyright(C)2013byGitHub</metadata><!--scale(0.01565557729941)--><pathtransform=''d='M76864h-192s-2540-256256c022343864h137c-11-19-18-41-18-640-128128-128128-128h192s1280128128-128128-128128064-64128h64s2560256-256-256-256-256-256zm-72192h-137c1119184118640128-128128-128128h-192s-1280-128-128128-128128-128-4-6566-128h-66s-2560-256256256256256256h192s2560256-256c0-22-4-44-8-64z'/></svg>\");background-size:contain;background-repeat:no-repeat;background-position:bottom}body h1,body h2,body h3,body h4,body h5,body h6{margin:1em 0 15px;padding:0;font-weight:bold;line-height:1.7;cursor:text;position:relative}body h1 .octicon-link,body h2 .octicon-link,body h3 .octicon-link,body h4 .octicon-link,body h5 .octicon-link,body h6 .octicon-link{display:none;color:#000}body h1:hover a.anchor,body h2:hover a.anchor,body h3:hover a.anchor,body h4:hover a.anchor,body h5:hover a.anchor,body h6:hover a.anchor{text-decoration:none;line-height:1;padding-left:0;margin-left:-22px;top:15%}body h1:hover a.anchor .octicon-link,body h2:hover a.anchor .octicon-link,body h3:hover a.anchor .octicon-link,body h4:hover a.anchor .octicon-link,body h5:hover a.anchor .octicon-link,body h6:hover a.anchor .octicon-link{display:inline-block}body h1 tt,body h1 code,body h2 tt,body h2 code,body h3 tt,body h3 code,body h4 tt,body h4 code,body h5 tt,body h5 code,body h6 tt,body h6 code{font-size:inherit}body h1{font-size:2.5em;border-bottom:1px solid #ddd}body h2{font-size:2em;border-bottom:1px solid #eee}body h3{font-size:1.5em}body h4{font-size:1.2em}body h5{font-size:1em}body h6{color:#777;font-size:1em}body p,body blockquote,body ul,body ol,body dl,body table,body pre{margin:15px 0}body h1 tt,body h1 code,body h2 tt,body h2 code,body h3 tt,body h3 code,body h4 tt,body h4 code,body h5 tt,body h5 code,body h6 tt,body h6 code{font-size:inherit}body hr{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC);background-repeat:repeat-x;background-color:transparent;background-position:0 0;border:0 none;color:#ccc;height:4px;margin:15px 0;padding:0}body li p.first{display:inline-block}body ul,body ol{padding-left:30px}body ul.no-list,body ol.no-list{list-style-type:none;padding:0}body ul ul,body ul ol,body ol ol,body ol ul{margin-bottom:0;margin-top:0}body dl{padding:0}body dl dt{font-size:14px;font-style:italic;font-weight:700;margin-top:15px;padding:0}body dl dd{margin-bottom:15px;padding:0 15px}body blockquote{border-left:4px solid #DDD;color:#777;padding:0 15px}body blockquote>:first-child{margin-top:0}body blockquote>:last-child{margin-bottom:0}body table{display:block;overflow:auto;width:100%}body table th{font-weight:700}body table th,body table td{border:1px solid #ddd;padding:6px 13px}body table tr{background-color:#fff;border-top:1px solid #ccc}body table tr:nth-child(2n){background-color:#f8f8f8}body img{-moz-box-sizing:border-box;box-sizing:border-box;max-width:100%}body span.frame{display:block;overflow:hidden}body span.frame>span{border:1px solid #ddd;display:block;float:left;margin:13px 0 0;overflow:hidden;padding:7px;width:auto}body span.frame span img{display:block;float:left}body span.frame span span{clear:both;color:#333;display:block;padding:5px 0 0}body span.align-center{clear:both;display:block;overflow:hidden}body span.align-center>span{display:block;margin:13px auto 0;overflow:hidden;text-align:center}body span.align-center span img{margin:0 auto;text-align:center}body span.align-right{clear:both;display:block;overflow:hidden}body span.align-right>span{display:block;margin:13px 0 0;overflow:hidden;text-align:right}body span.align-right span img{margin:0;text-align:right}body span.float-left{display:block;float:left;margin-right:13px;overflow:hidden}body span.float-left span{margin:13px 0 0}body span.float-right{display:block;float:right;margin-left:13px;overflow:hidden}body span.float-right>span{display:block;margin:13px auto 0;overflow:hidden;text-align:right}body code,body tt{background-color:#f8f8f8;border:1px solid #ddd;border-radius:3px;margin:0 2px;padding:0 5px}body code{white-space:nowrap}code,pre{font-family:Consolas,'Liberation Mono',Courier,monospace;font-size:12px}body pre>code{background:transparent;border:0;margin:0;padding:0;white-space:pre}body .highlight pre,body pre{background-color:#f8f8f8;border:1px solid #ddd;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}body pre code,body pre tt{background-color:transparent;border:0;margin:0;padding:0}body .task-list{list-style-type:none;padding-left:10px}.task-list-item{padding-left:20px}.task-list-item label{font-weight:normal}.task-list-item.enabled label{cursor:pointer}.task-list-item+.task-list-item{margin-top:5px}.task-list-item-checkbox{float:left;margin-left:-20px;margin-top:7px}.highlight{background:#fff}.highlight .c{color:#998;font-style:italic}.highlight .err{color:#a61717;background-color:#e3d2d2}.highlight .k{font-weight:bold}.highlight .o{font-weight:bold}.highlight .cm{color:#998;font-style:italic}.highlight .cp{color:#999;font-weight:bold}.highlight .c1{color:#998;font-style:italic}.highlight .cs{color:#999;font-weight:bold;font-style:italic}.highlight .gd{color:#000;background-color:#fdd}.highlight .gd .x{color:#000;background-color:#faa}.highlight .ge{font-style:italic}.highlight .gr{color:#a00}.highlight .gh{color:#999}.highlight .gi{color:#000;background-color:#dfd}.highlight .gi .x{color:#000;background-color:#afa}.highlight .go{color:#888}.highlight .gp{color:#555}.highlight .gs{font-weight:bold}.highlight .gu{color:purple;font-weight:bold}.highlight .gt{color:#a00}.highlight .kc{font-weight:bold}.highlight .kd{font-weight:bold}.highlight .kn{font-weight:bold}.highlight .kp{font-weight:bold}.highlight .kr{font-weight:bold}.highlight .kt{color:#458;font-weight:bold}.highlight .m{color:#099}.highlight .s{color:#d14}.highlight .n{color:#333}.highlight .na{color:teal}.highlight .nb{color:#0086b3}.highlight .nc{color:#458;font-weight:bold}.highlight .no{color:teal}.highlight .ni{color:purple}.highlight .ne{color:#900;font-weight:bold}.highlight .nf{color:#900;font-weight:bold}.highlight .nn{color:#555}.highlight .nt{color:navy}.highlight .nv{color:teal}.highlight .ow{font-weight:bold}.highlight .w{color:#bbb}.highlight .mf{color:#099}.highlight .mh{color:#099}.highlight .mi{color:#099}.highlight .mo{color:#099}.highlight .sb{color:#d14}.highlight .sc{color:#d14}.highlight .sd{color:#d14}.highlight .s2{color:#d14}.highlight .se{color:#d14}.highlight .sh{color:#d14}.highlight .si{color:#d14}.highlight .sx{color:#d14}.highlight .sr{color:#009926}.highlight .s1{color:#d14}.highlight .ss{color:#990073}.highlight .bp{color:#999}.highlight .vc{color:teal}.highlight .vg{color:teal}.highlight .vi{color:teal}.highlight .il{color:#099}.highlight .gc{color:#999;background-color:#eaf2f5}.type-csharp .highlight .k{color:#00f}.type-csharp .highlight .kt{color:#00f}.type-csharp .highlight .nf{color:#000;font-weight:normal}.type-csharp .highlight .nc{color:#2b91af}.type-csharp .highlight .nn{color:#000}.type-csharp .highlight .s{color:#a31515}.type-csharp .highlight .sc{color:#a31515}</style>";

exports.index = function (req, res) {
    var contentType = req.get('Accept');
    if (contentType === 'application/json' || contentType === 'application/hal+json') {
        return res.json({
            _links: {
                users: { href: '/user' },
                questions: { href: '/question' }
            }
        });
    }

    fs.readFile('README.md', function (err, file) {
        if (!file) {
            res.status(404);
            return res.end('Could not read the README file. Check project integrity.');
        }
        markdown(file.toString(), function (err, html) {
            if (err) {
                res.status(500);
                return res.end('Could not render Markdown to HTML.');
            }
            res.status(200);
            return res.send('<html><head>' + style + '</head><body>' + html + '</body></html>');
        });
    });
};
