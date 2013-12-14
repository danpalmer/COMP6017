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


### To Do

 - Validation
 - Following HREFs on creating models
   - Create a new item
   - Check it has an HREF (assert)
   - Follow the HREF
   - Check it is the same item
 - Test PUTs for updates
   - Making sure the update happens
   - Check status code
 - Test DELETEs on all models
   - "server actually deletes representation"
   - "server returns 204 when deleting"
 - Test 404s on all models
   - Check known non-existent model (i.e. id: 99999)
   - Check /question/nonexistent
   - Check /question/nonexistent/comment/nonexistentid
   - Check /question/real_id/comment/nonexistentid
   - Check /question/nonexistent/answer/nonexistent/comment/nonexistentid
   - Check /question/real_id/answer/nonexistent/comment/nonexistentid
   - Check /question/real_id/answer/real_id/comment/nonexistentid
 - Test all models (and sub models) contain an HREF
   - Check where appropriate that they link instead of containing actual representations
 - Test last modified not changed on idempotent methods (HEAD, GET)
 - Test it is changed on POST and PUT
 - Test whether returned objects (for GET) are valid
 - Fix tests for question creation to include correct parameters

 /question
 	- Just question objects, link to comment lists, link to author
 /question/:id
 	- Question object, list of comments with authors, gives author, list of answers, with answer authors, answers have link to list of comments.
 /question/:id/comment
 	- List of comments with authors
 /question/:id/answer
 	- List of answers with authors
 /question/:id/answer/:id/comment
 	- List of comments with authors
