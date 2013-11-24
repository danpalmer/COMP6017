COMP6017 -- Advanced Topics on Web Service
==========================================

Available Endpoints:

 - `/`
 - `/user`
 - `/user`
 - `/user/:uid`
 - `/user/:uid`
 - `/user/:uid`
 - `/user/:uid`
 - `/question`
 - `/question`
 - `/question/:qid`
 - `/question/:qid`
 - `/question/:qid`
 - `/question/:qid`
 - `/question/:rid/comment`
 - `/question/:rid/comment`
 - `/question/:rid/comment/:cid`
 - `/question/:rid/comment/:cid`
 - `/question/:rid/comment/:cid`
 - `/question/:rid/comment/:cid`
 - `/question/:qid/answer`
 - `/question/:qid/answer`
 - `/question/:qid/answer/:aid`
 - `/question/:qid/answer/:aid`
 - `/question/:qid/answer/:aid`
 - `/question/:qid/answer/:aid`
 - `/question/:qid/answer/:rid/comment`
 - `/question/:qid/answer/:rid/comment`
 - `/question/:qid/answer/:rid/comment/:cid`
 - `/question/:qid/answer/:rid/comment/:cid`
 - `/question/:qid/answer/:rid/comment/:cid`
 - `/question/:qid/answer/:rid/comment/:cid`

URL Parameter Names:

 - `:uid` - User Id,
 - `:qid` - Question Id,
 - `:cid` - Comment Id,
 - `:aid` - Answer Id,
 - `:rid` - Resource Id, where the Resource is unknown by the comment model

HTTP Status Codes:

 - Successful: 200 OK
 - Created server-side representation (on POST): 201 Created
 - Deleted server-side representation (on DELETE): 204 No Content
 - Updated server-side representation (on PUT): 200 OK
 - Failed to store representation: 503 Service Unavailable
 - Failed to find resource: 404 Not Found
 - Failed to delete resource: 503 Service Unavailable
 - POST doesn't contain required fields: 400 Bad Request
 - PUT doesn't contain required fields: 400 Bad Request
 - POST contains invalid field (e.g. non-existent question for comment): 400 Bad Request
