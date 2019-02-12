const express = require('express');
const router = express.Router();

const {decodeToken, checkUser} = require('../middleware/check-auth');
const listController = require('../controllers/list-controller');

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title Title
 * @apiParam {String} description Description
 * @apiParam {String} description Description
 * 
 * @api {post} /api/list/create Create List
 * @apiName CreateList
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List created successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "owner": "XKAZUIp",
 *          "name": "Vikas",
 *          "id": "YUoPKQ",
 *          "createdDate": "2019-02-11T18:34:13.697Z"
 *      }
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "LC-CL-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-CL-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/create', decodeToken, checkUser, listController.createList);

/**
 * @apiVersion 1.0.0
 *
 * 
 * @api {get} /api/list/all Get All Own Lists
 * @apiName GetOwnLists
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List fetched successfully!!!",
 *      "data": [{
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "owner": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "id": "YUoPKQ",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "status": "open",
 *          "completionDate": "",
 *          "completedByName": ""
 *         },
 *         {
 *          "title": "Another random title",
 *          "description": "Another random description",
 *          "owner": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "id": "AoIIREw",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "status": "done",
 *          "completionDate": "2019-02-11T18:34:13.697Z",
 *          "completedByName": "Noothana P"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-GOL-1",
 *      "errorType": "UnknownError"
 *    }
 */
router.get('/all', decodeToken, checkUser, listController.getOwnLists);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String[]} friends Friends ID's
 * 
 * @api {post} /api/list/friends-lists Get User Friends Lists
 * @apiName GetUserFriendsLists
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List created successfully!!!",
 *      "data": [{
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "owner": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "id": "YUoPKQ",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "status": "open",
 *          "completionDate": "",
 *          "completedByName": ""
 *         },
 *         {
 *          "title": "Another random title",
 *          "description": "Another random description",
 *          "owner": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "id": "AoIIREw",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "status": "done",
 *          "completionDate": "2019-02-11T18:34:13.697Z",
 *          "completedByName": "Noothana P"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "LC-GFL-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-CL-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/friends-lists', decodeToken, checkUser, listController.getFriendsLists);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id List ID
 * 
 * @api {post} /api/list/delete Delete List By Id
 * @apiName DeleteList
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List deleted successfully!!!",
 *      "data": {}
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "LC-DLBI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-DLBI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/delete', decodeToken, checkUser, listController.deleteListById);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id List ID
 * 
 * @api {post} /api/list/update/:id Update List By Id
 * @apiName UpdateList
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List Updated successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "owner": "XKAZUIp",
 *          "name": "Vikas",
 *          "id": "YUoPKQ",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "lastModifiedBy": "Vikas Pulluri",
 *          "lastModifiedOn": "2019-02-11T18:34:13.697Z",
 *          "status": "open"
 *      }
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "LC-ULBI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-ULBI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/update/:id',decodeToken, checkUser, listController.updateListById);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id List ID
 * @apiParam {String} completedByName Username
 * 
 * @api {post} /api/list/update/:id Update List By Id
 * @apiName UpdateList
 * @apiGroup List
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "List Updated successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "owner": "XKAZUIp",
 *          "name": "Vikas",
 *          "id": "YUoPKQ",
 *          "createdDate": "2019-02-11T18:34:13.697Z",
 *          "lastModifiedBy": "Vikas Pulluri",
 *          "lastModifiedOn": "2019-02-11T18:34:13.697Z",
 *          "status": "done",
 *          "completionDate": "2019-02-11T18:34:13.697Z",
 *          "completedByName": "Noothana P"
 *      }
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "LC-ULSBI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "LC-ULSBI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/update-status/:id', decodeToken, checkUser, listController.updateListStatusById);

module.exports = router;
