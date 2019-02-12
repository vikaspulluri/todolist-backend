const User = require('../models/user-model');
const Request = require('../models/request-model');
const Feedback = require('../models/feedback-model');
const bcrypt = require('bcryptjs');
const {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');
const jwt = require('jsonwebtoken');
const validateRequest = require('../libraries/validate-request');
const dateUtility = require('../libraries/date-formatter');
const logger = require('../libraries/log-message');
const mailService = require('../libraries/mail-service');

exports.createUser = (req, res, next) => {
    let reqValidity = validateRequest(req, 'email','firstName','lastName','password');
    if(reqValidity.includes(false)) {
        let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('UC-CU-1').build();
        return next(error);
    }
    const isAdmin = (req.headers.isadmin) ? true : false;
    bcrypt.hash(req.body.password, 12)
            .then(hash => {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    createdDate: dateUtility.formatDate(),
                    hasAdminPrevilieges: isAdmin,
                });
                user.save()
                .then(result => {
                    let data = {
                        userId: result._id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        phone: result.phone,
                    };
                    let response = new SuccessResponseBuilder('User created successfully!!!')
                                        .status(201)
                                        .data(data)
                                        .build();
                    return res.status(201).send(response);
                })
                .catch(error => {
                    logger.log(error, req, 'UC-CU');
                    let err = new ErrorResponseBuilder().status(500).errorCode('UC-CU-2').errorType('UnknownError').build();
                    return next(err);
                })
            })
}

exports.loginUser = (req, res, next) => {
    let reqValidity = validateRequest(req, 'email','password');
    if(reqValidity.includes(false)) {
        let error = new ErrorResponseBuilder('Invalid request')
                                        .errorType('DataValidationError')
                                        .status(400)
                                        .errorCode('UC-LU-1')
                                        .build();
        return next(error);
    }
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
          if(!user) {
            let error = new ErrorResponseBuilder('Invalid username provided')
                                        .status(401)
                                        .errorType('OAuthError')
                                        .errorCode('UC-LU-2')
                                        .build();
            return next(error);
          }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, fetchedUser.password);
        })
        .then(result => {
            if(!result){
                let error = new ErrorResponseBuilder('Invalid Authentication Credentials')
                                        .status(401)
                                        .errorType('OAuthError')
                                        .errorCode('UC-LU-3')
                                        .build();
                return next(error);
            }
            const token = jwt.sign({email: fetchedUser.email, firstName: fetchedUser.firstName, lastName: fetchedUser.lastName, id: fetchedUser._id, isAdmin: fetchedUser.hasAdminPrevilieges}, process.env.JWT_KEY, {expiresIn: '1h'});
            const data = {
                token: token,
                expiryDuration: 3600,
                username: fetchedUser.firstName + ' ' + fetchedUser.lastName,
                userId: fetchedUser._id
            };
            let jsonResponse = new SuccessResponseBuilder('User Logged In Successfully...').data(data).build();
            return res.status(200).send(jsonResponse);
        })
        .catch(error => {
            logger.log(error, req, 'UC-LU');
            let err = new ErrorResponseBuilder().status(500).errorCode('UC-LU-4').errorType('UnknownError').build();
            return next(err);
        });
}

exports.getUser = (req, res, next) => {
    User.findById(req.userData.userId)
        .exec()
        .then(result => {
            let data = {
                userId: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                createdOn: result.createdDate,
            }
            let friends = [...new Set(result.friends)];
            User.find({'_id': {$in: friends}}, {firstName:1, lastName:1, _id: 1})
                .then(docs => {
                  data.friends = docs;
                })
            Request.find({'requesterId': result._id}, {__v: 0})
                    .then(docs => {
                      data.sentRequests = docs;
                      Request.find({'receiverId': result._id}, {__v: 0})
                        .then(docs2 => {
                          data.receivedRequests = docs2;
                          let jsonResponse = new SuccessResponseBuilder('User Data Fetched Successfully!!!').data(data).build();
                          res.status(200).send(jsonResponse);
                        })
                        .catch(error => {
                          logger.log(error, req, 'UC-GU');
                          let err = new ErrorResponseBuilder().status(500).errorCode('UC-GU-2').errorType('UnknownError').build();
                          return next(err);
                        });
                    })
                    .catch(error => {
                      logger.log(error, req, 'UC-GU');
                      let err = new ErrorResponseBuilder().status(500).errorCode('UC-GU-1').errorType('UnknownError').build();
                      return next(err);
                    });
        })
        .catch(error => {
            logger.log(error, req, 'UC-GU');
            let err = new ErrorResponseBuilder().status(500).errorCode('UC-GU-3').errorType('UnknownError').build();
            return next(err);
        })
}

exports.getAllUsers = (req, res, next) => {
  User.find({},{firstName: 1, lastName: 1, _id: 1})
      .then(result => {
        let jsonResponse = new SuccessResponseBuilder('Users data fetched successfully!!!').data(result).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-GAU');
        let err = new ErrorResponseBuilder().status(500).errorCode('UC-GAU-1').errorType('UnknownError').build();
        return next(err);
      })
}
 
exports.getUserNotifications = (req, res, next) => {
  User.findOne({_id: req.userData.userId},{notifications: 1})
      .exec()
      .then(result => {
        let jsonResponse = new SuccessResponseBuilder('User notifications fetched successfully!!!').data(result.notifications).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-GUN-1');
        let err = new ErrorResponseBuilder().status(500).errorCode('UC-GUN-1').errorType('UnknownError').build();
        return next(err);
      })
}

exports.getUserFriends = (req, res, next) => {
  User.findOne({_id: req.userData.userId}, {friends: 1})
      .exec()
      .then(result => {
        let friends = [...new Set(result.friends)];
        User.find({'_id': {$in: friends}}, {firstName:1, lastName:1, _id: 1})
                .then(docs => {
                  let jsonResponse = new SuccessResponseBuilder('User friends fetched successfully!!!').data(docs).build();
                  res.status(200).send(jsonResponse);
                })
                .catch(error => {
                  logger.log(error, req, 'UC-GUF-1');
                  let err = new ErrorResponseBuilder().status(500).errorCode('UC-GUF-1').errorType('UnknownError').build();
                  return next(err);
                })
      })
      .catch(error => {
        logger.log(error, req, 'UC-GUF-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('UC-GUF-2').errorType('UnknownError').build();
        return next(err);
      })
}

exports.sendUserFeedback = (req, res, next) => {
  let reqValidity = validateRequest(req, 'experience','userName','feedback');
  if(reqValidity.includes(false)) {
      let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('UC-SUF-1').build();
      return next(error);
  }
  const feedbackData = {
    name: req.body.userName,
    experience: req.body.experience,
    feedback: req.body.feedback,
    userId: req.userData.userId,
    email: req.userData.email
  };
  const feedback = new Feedback(feedbackData);
  feedback.save()
    .then(result => {
      mailService.sendFeedback(feedbackData);
      let jsonResponse = new SuccessResponseBuilder('Thanks for your time!!!').data().build();
      res.status(200).send(jsonResponse);
    })
    .catch(error => {
      logger.log(error, req, 'UC-SUF-2');
      let err = new ErrorResponseBuilder().status(500).errorCode('UC-SUF-2').errorType('UnknownError').build();
      return next(err);
    })
}

exports.updateUserPersonalInfo = (req, res, next) => {
  let reqValidity = validateRequest(req, 'firstName','lastName');
  if(reqValidity.includes(false)) {
      let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('UC-UUPI-1').build();
      return next(error);
  }
  User.findOneAndUpdate({_id: req.userData.userId},
                        {$set: {firstName: req.body.firstName, lastName: req.body.lastName}},
                        {new: true})
      .then(docs => {
        if(docs.firstName) {
          let obj = {
            firstName: docs.firstName,
            lastName: docs.lastName
          };
          let jsonResponse = new SuccessResponseBuilder('Successfully updated!!!').data(obj).build();
          res.status(200).send(jsonResponse);
        } else {
          logger.log(docs, req, 'UC-UUPI-2');
          let err = new ErrorResponseBuilder('Unable to update your details!!! Please try again later...').status(500).errorCode('UC-UUPI-3').errorType('UnknownError').build();
          return next(err);
        }

      })
      .catch(error => {
        logger.log(error, req, 'UC-UUPI-3');
        let err = new ErrorResponseBuilder().status(500).errorCode('UC-UUPI-3').errorType('UnknownError').build();
        return next(err);
      })
}

exports.requestUserPassword = (req, res, next) => {
  let reqValidity = validateRequest(req, 'email');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('UC-RUP-1').build();
    return next(error);
  }
  User.countDocuments({email: req.body.email})
      .exec()
      .then(docsCount => {
        if(docsCount > 0) {
          // send recovery link to provided email
          const token = jwt.sign({email: req.body.email}, process.env.JWT_KEY, {expiresIn: '1h'});
          const mailData = {
            email: req.body.email,
            verificationCode: token
          };
          mailService.sendRecoveryMail(mailData);
          let jsonResponse = new SuccessResponseBuilder('We have sent a revocery code to your registered mail. Please check your mail and follow the steps mentioned!!!').data().build();
          res.status(200).send(jsonResponse);
        } else {
          // no user found with the email provided
          let error = new ErrorResponseBuilder('No user found with the provided email Id, please check again the email provided!!!').status(404).errorType('DataNotFoundError').errorCode('UC-RUP-2').build();
          return next(error);
        }
      })
      .catch(error => {
        logger.log(error, req, 'UC-RUP-3');
        let err = new ErrorResponseBuilder().status(500).errorCode('UC-RUP-3').errorType('UnknownError').build(); 
        return next(err);
      })
}

exports.resetPassword = (req, res, next) => {
  let reqValidity = validateRequest(req, 'verificationCode', 'newPassword');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('UC-RP-1').build();
    return next(error);
  }
  const token = `${req.body.verificationCode}`;
  let decodedToken = '';
  // jwt.verify in synchronous mode will throw error incase of invalid token
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
    let email = decodedToken.email;
    bcrypt.hash(req.body.newPassword, 12)
          .then(password => {
            User.findOneAndUpdate({email: email},{password: password})
                .then(result => {
                  let jsonResponse = new SuccessResponseBuilder('Password updated successfully!!! Please login with your new password...').data().build();
                  res.status(200).send(jsonResponse);
                })
                .catch(err => {
                  logger.log(err, req, 'UC-RP-2');
                  let error = new ErrorResponseBuilder('Something went wrong, please try again later!!!').errorCode('UC-RP-2').errorType('UnknownError').build();
                  return next(error);
                })
          })
          .catch(err => {
            logger.log(err, req, 'UC-RP-3');
            let error = new ErrorResponseBuilder('Something went wrong, please try again later!!!').errorCode('UC-RP-3').errorType('UnknownError').build();
            return next(error);
          })
  } catch(err) {
    logger.log(err, req, 'UC-RP-4');
    let error = new ErrorResponseBuilder('Please provide correct verification code!!!').errorCode('UC-RP-4').errorType('OAuthError').build();
    return res.status(400).send(error);
  }
}