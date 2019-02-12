const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item-controller');
const {decodeToken, checkUser} = require('../middleware/check-auth');

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title Title
 * @apiParam {String} creatorName UserName
 * @apiParam {String} listId List ID
 * 
 * @api {post} /api/item/create Create Item
 * @apiName CreateItem
 * @apiGroup Item
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Item created successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "creator": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "listId": "OJWMsA",
 *          "id": "YUoPKQ",
 *          "addedOn": "2019-02-11T18:34:13.697Z",
 *          "parent": "OJWMsA",
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
 *      "errorCode": "IC-CI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "IC-CI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/create', decodeToken, checkUser, itemController.createItem);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Item ID
 * @apiParam {String} title Title
 * @apiParam {String} creator UserID
 * @apiParam {String} listId List ID
 * @apiParam {String} parent Parent ID
 * @apiParam {String} editedOn EditedOn Date
 * @apiParam {String} editedBy EditedBy User ID
 * 
 * @api {post} /api/item/update Update Item
 * @apiName UpdateItem
 * @apiGroup Item
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Item updated successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "creator": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "listId": "OJWMsA",
 *          "id": "YUoPKQ",
 *          "addedOn": "2019-02-11T18:34:13.697Z",
 *          "parent": "OJWMsA",
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
 *      "errorCode": "IC-EI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "IC-EI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/update', decodeToken, checkUser, itemController.updateItem);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Item ID
 * @apiParam {String} completedBy User Name
 * @apiParam {String} editedBy EditedBy User ID
 * 
 * @api {post} /api/item/update-status Update Item Status
 * @apiName UpdateItemStatus
 * @apiGroup Item
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Item updated successfully!!!",
 *      "data": {
 *          "title": "Some random title",
 *          "description": "Some random description",
 *          "creator": "XKAZUIp",
 *          "creatorName": "Vikas",
 *          "listId": "OJWMsA",
 *          "id": "YUoPKQ",
 *          "addedOn": "2019-02-11T18:34:13.697Z",
 *          "parent": "OJWMsA",
 *          "status": "done"
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
 *      "errorCode": "IC-UIS-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "IC-UIS-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/update-status', decodeToken, checkUser, itemController.updateItemStatus);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Item ID
 * 
 * @api {post} /api/item/delete Delete Item
 * @apiName DeleteItem
 * @apiGroup Item
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Item deleted successfully!!!",
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
 *      "errorCode": "IC-DI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "IC-DI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/delete', decodeToken, checkUser, itemController.deleteItem);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} listId List ID
 * @apiParam {Number} itemsToSkip Numer Of Items To Skip
 * 
 * @api {post} /api/item/all Get All Items
 * @apiName GetItems
 * @apiGroup Item
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Items fetched successfully!!!",
 *      "data": {
 *          "items": [
 *              {
 *                   "title": "Some random title",
 *                   "description": "Some random description",
 *                   "creator": "XKAZUIp",
 *                   "creatorName": "Vikas",
 *                   "listId": "OJWMsA",
 *                   "id": "YUoPKQ",
 *                   "addedOn": "2019-02-11T18:34:13.697Z",
 *                   "parent": "OJWMsA",
 *                   "status": "open"
 *              }
 *          ],
 *          "subItems": [
 *              {
 *                   "title": "Some random title",
 *                   "description": "Some random description",
 *                   "creator": "XKAZUIp",
 *                   "creatorName": "Vikas",
 *                   "listId": "OJWMsA",
 *                   "id": "ALnIKw",
 *                   "addedOn": "2019-02-11T18:34:13.697Z",
 *                   "parent": "YUoPKQ",
 *                   "status": "open"
 *              }
 *          ]
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
 *      "errorCode": "IC-GIBLI-1",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An Unknown Error Occured!!!",
 *      "errorCode": "IC-GIBLI-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/all', decodeToken, checkUser, itemController.getItemsByListId);

module.exports = router;
