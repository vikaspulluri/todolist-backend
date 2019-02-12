const express = require('express');
const router = express.Router();

const {decodeToken, checkUser} = require('../middleware/check-auth');
const userController = require('../controllers/user-controller');
const uniqueValidator = require('../middleware/unique-validator');
const users = require('../models/user-model');

/**
 * @apiVersion 1.0.0
 *
 * @api {post} /api/user/create Create New User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} firstName First Name
 * @apiParam {String} lastName  Last Name
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 *
 * @apiHeader {String} [isadmin] Create an account with admin previleges
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 201 OK
 *    {
 *      "error": false,
 *      "message": "User created successfully!!!",
 *      "data": {
 *          "userId": "5b9ff8f4558ca01054196469",
 *          "firstName": "Vikas",
 *          "lastName": "Pulluri",
 *          "email": "vikasiiitn@gmail.com"
 *      }
 *@apiErrorExample {json} Error Response-1
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-CU-1",
 *      "errorType": "DataValidationError"
 *    }
 *@apiErrorExample {json} Error Response-2
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "An account already exists with the provided email Id",
 *      "errorCode": "UV-1",
 *      "errorType": "DuplicateDataError"
 *    }
 * @apiErrorExample {json} Error Response-3
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "error": true,
 *      "message": "Something went wrong, please try again later...",
 *      "errorCode": "UC-CU-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/create', uniqueValidator(users,'email'), userController.createUser);

/**
 * @apiVersion 1.0.0
 *
 * @api {post} /api/user/login Login User
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User Logged In Successfully...",
 *      "data": {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaWlpdG5AZ21haWwuY29tIiwiaWQiOiI1Yjk2YWRjNDc0NGQ0ZTFhMzhjZjJhOGEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMTMwNjQsImV4cCI6MTUzNzIxNjY2NH0.2U_A27fPZPgkqN1DaS9fg_C6qr5AUeU7rRsO6yQk1uQ",
 *          "username": "Vikas Pulluri",
 *          "email": "vikasiiitn@gmail.com",
 *          "expiryDuration": 3600,
 *          "userId": "5b96adc4744d4e1a38cf2a8a"
 *      }
 * @apiErrorExample {json} Error Response-1
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-LU-1",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-2
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Invalid username provided",
 *      "errorCode": "UC-LU-2",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-3
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Invalid Authentication Credentials",
 *      "errorCode": "UC-LU-3",
 *      "errorType": "OAuthError"
 *    }
 * @apiErrorExample {json} Error Response-4
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "error": true,
 *      "message": "Something went wrong, please try again later...",
 *      "errorCode": "UC-LU-4",
 *      "errorType": "UknownError"
 *    }
 */
router.post('/login', userController.loginUser);

/**
 * @apiVersion 1.0.0
 *
 * @api {get} /api/user/@self Get User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User Data Fetched Successfully!!!",
 *      "data": {
 *          "userId": "5b9ff8f4558ca01054196469",
 *          "firstName": "Vikas",
 *          "lastName": "Pulluri",
 *          "email": "vikasiiitn@gmail.com",
 *          "createdOn": "2018-09-10T18:28:32.000Z",
 *          "phone": [
 *              9494336401
 *           ]
 *      }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "error": true,
 *      "message": "Authentication Failed",
 *      "errorCode": "CA-1",
 *      "errorType": "OAuthError"
 *    }
 */
router.get('/@self', decodeToken, checkUser, userController.getUser);

router.get('/all-users', decodeToken, checkUser, userController.getAllUsers);

/**
 * @apiVersion 1.0.0
 *
 * @api {get} /api/user/notifications Get User Notifications
 * @apiName GetUserNotifications
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User Data Fetched Successfully!!!",
 *      "data": [
 *          {"arrived":"2018-11-24T08:26:47.457Z","_id":"5bf90b475150c51564ea9167","message":"You have received a friend request from Noothana P"},
 *          {"arrived":"2018-11-24T08:27:41.682Z","_id":"5bf90b7d5150c51564ea9168","message":"You have accepted friend request of Noothana P"},
 *          {"arrived":"2018-11-24T09:39:01.950Z","_id":"5bf91c35e32e760fdcaf485e"}
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
 *      "message": "An unknown error occured",
 *      "errorCode": "UC-GUN-1",
 *      "errorType": "UnknownError"
 *    }
 */
router.get('/notifications', decodeToken, checkUser, userController.getUserNotifications);


/**
 * @apiVersion 1.0.0
 *
 * @api {get} /api/user/friends Get User Friends
 * @apiName GetUserFriends
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "User friends fetched successfully!!!",
 *      "data": [
 *          {"_id":"THS4eX6xH","firstName":"Vikas","lastName":"Pulluri"},
 *          {"_id":"Uu_yqqHgR","firstName":"Karthik","lastName":"G"}
 *       ]
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
 *      "message": "An unknown error occured",
 *      "errorCode": "UC-GUF-1",
 *      "errorType": "UnknownError"
 *    }
 */
router.get('/friends', decodeToken, checkUser, userController.getUserFriends);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} experience Experience with app
 * @apiParam {String} userName Username
 * @apiParam {String} feedback Feedback/Suggestions text
 * 
 * @api {post} /api/user/feedback Post Feedback
 * @apiName PostUserFeedback
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Thanks for your time!!!",
 *      "data": []
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
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-SUF-1",
 *      "errorType": "DataValidationError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An unknown error occured",
 *      "errorCode": "UC-SUF-2",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/feedback', decodeToken, checkUser, userController.sendUserFeedback);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} firstName User Firstname
 * @apiParam {String} lastName User Lastname
 * 
 * @api {post} /api/user/update User Personal Info Update
 * @apiName UpdateUserPersonalInfo
 * @apiGroup User
 *
 * @apiHeader {String} authorization Authorization Token prepended with (Bearer )
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Successfully Updated!!!",
 *      "data": {
 *          "firstName": "Vikas",
 *          "lastName": "Pulluri" 
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
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-UUPI-1",
 *      "errorType": "DataValidationError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "Unable to update your details!!! Please try again later...",
 *      "errorCode": "UC-UUPI-2",
 *      "errorType": "UnknownError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An unknown error occured",
 *      "errorCode": "UC-UUPI-3",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/update', decodeToken, checkUser, userController.updateUserPersonalInfo);


/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Registered E-mail
 * 
 * @api {post} /api/user/request-password User Request Password
 * @apiName UserRequestPassword
 * @apiGroup User
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "We have sent a revocery code to your registered mail. Please check your mail and follow the steps mentioned!!!",
 *      "data": {}
 *    }
 * 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": true,
 *      "message": "Invalid Request",
 *      "errorCode": "UC-RUP-1",
 *      "errorType": "DataValidationError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": true,
 *      "message": "No user found with the provided email Id, please check again the email provided!!!",
 *      "errorCode": "UC-RUP-2",
 *      "errorType": "DataNotFoundError"
 *    }
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "An unknown error occured",
 *      "errorCode": "UC-RUP-3",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/request-password', userController.requestUserPassword);

/**
 * @apiVersion 1.0.0
 *
 * @apiParam {String} verificationCode Verification code sent to Email
 * @apiParam {String} newPassword New password
 * 
 * @api {post} /api/user/reset-password User Reset Password
 * @apiName UserResetPassword
 * @apiGroup User
 *
 *
 * @apiSuccessExample {json} Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "error": false,
 *      "message": "Password updated successfully!!! Please login with your new password...",
 *      "data": {}
 *    }
 *
 *  @apiErrorExample {json} Error Response
 *    HTTP/1.1 400 Bad request
 *    {
 *      "error": true,
 *      "message": "Please provide correct verification code!!!",
 *      "errorCode": "UC-RP-3",
 *      "errorType": "OAuthError"
 *    } 
 * @apiErrorExample {json} Error Response
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": true,
 *      "message": "Something went wrong, please try again later!!!",
 *      "errorCode": "UC-RP-3",
 *      "errorType": "UnknownError"
 *    }
 */
router.post('/reset-password', userController.resetPassword);

module.exports = router;
