# COMP6017 -- Advanced Topics on Web Service

### API Endpoints

All endpoints reutrn `application/javascript` unless otherwise stated. All endpoints will respond to the **HEAD** method with the appropriate headers.

##### /
 - **GET**: returns this documentation formatted as `text/html`.

##### /user
 - **GET**: returns a list of users.  
 - **POST**: creates and returns a user.

##### /user/:uid
 - **GET**: returns the specified user.
 - **PUT**: updates and returns the specified user.
 - **DELETE**: deletes the specified user.

##### /question
 - **GET**: returns a list of questions.
 - **POST**: creates and returns a question.

##### /question/:qid
 - **GET**: returns the specified question.
 - **PUT**: updates and returns the specified user.
 - **DELETE**: deletes the specified question.

##### /question/:qid/comment
 - **GET**: returns a list of comments for the specified question.
 - **POST**: creates and returns a comment on the specified question.

##### /question/:qid/comment/:cid
 - **GET**: returns the specified comment for the specified question.
 - **PUT**: updates returns the specified comment for the specified question.
 - **DELETE**: deletes the specified comment for the specified question.

##### /question/:qid/answer
 - **GET**: returns a list of answers for the specified question.
 - **POST**: creates and returns an answer on the specified question.

##### /question/:qid/answer/:aid
 - **GET**: returns the specified answer for the specified question.
 - **PUT**: updates returns the specified answer for the specified question.
 - **DELETE**: deletes the specified answer for the specified question.

##### /question/:qid/answer/:aid/comment
 - **GET**: returns a list of comments for the specified answer on the specified question.
 - **POST**: creates and returns a comment on the specified answers on the specified question.

##### /question/:qid/answer/:aid/comment/:cid
 - **GET**: returns the specified comment for the specified answer on the specified question.
 - **PUT**: updates returns the specified comment for the specified answer on the specified question.
 - **DELETE**: deletes the specified comment for the specified answer on the specified question.



##### URL Parameter Names:

 - `:uid` - User Id
 - `:qid` - Question Id
 - `:cid` - Comment Id
 - `:aid` - Answer Id


### Data Models

##### User

User Provided Fields:

 - **name**: String, Editable, Required.
 - **email**: String (valid email address), Editable, Required.

Extra Returned Fields:

 - **dateSignedUp**: Date, Read-Only.
 - **dateModified**: Date, Read-Only.

##### Question

User Provided Fields:

 - **title**:
 - **content**:
 - **author_id**:

Extra Returned Fields:

 - **dateCreated**:
 - **dateModified**:
 - **comments**:
 - **answers**:

##### Answer


##### Comment


### Design Decisions

##### HTTP Status Codes

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


##### HATEOAS

We have made the decision to implement [JSON HAL (Hypertext Application Language)](http://tools.ietf.org/html/draft-kelly-json-hal-06). Linked resources are included in the `_links` object, where keys are the relation name, and values are an object with an `href` link to the resource. Aternatively, resources can be included directly in the `_embedded` object, where keys are the relation name, and values are the representation of that resource.

Here is a list of questions as an example of the usage of `_links`:



Here is single question with included resources to demonstrate usage of `_embedded`:



For backwards compatibility with clients who are not JSON HAL aware, and for compatibility with the Express web framework, resources are returned as `application/json` instead of `application/hal+json` as recommended.


### Testing

For testing the service we have created an automated test suite using Mocha -- a Node.js package for writing TDD/BDD style asynchronous tests. Assuming that the npm packages specified in `package.json` are installed to `node_modules`, and assuming the server is running on the default port (3000), tests can be run with the following command:

```
$ node_modules/mocha/bin/mocha -R spec tests
```

This prints out a list of tests and their status, printing stack traces wherever they may fail. As of submission, the tests are all passing. If any failing tests are encountered, ensure the server is running on port 3000, is accessible, that the project directory is writeable for the database creation, and that all modules in `package.json` have successfully installed. If these requirements have been satisfied, contact Dan Palmer and Sam Bull.


### JSLint Compliance

We have complied with JSLint, when run with the following options: `--node --devel --sloppy --unparam --nomen`. The tests are executed within a Mocha environment, which provides the global functions `describe` and `it` (along with others that we have no used), and therefore the tests will only pass JSLint validation with `--predef describe --predef it`. 



### To Do

 - Test PUTs for updates
   - Making sure the update happens
   - Check status code
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
