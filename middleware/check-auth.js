const jwt = require('jsonwebtoken');
let {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');

const decodeToken = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {email: decodedToken.email, userId: decodedToken.id, isAdmin: decodedToken.isAdmin, firstName: decodedToken.firstName, lastName: decodedToken.lastName};
    next();
  } catch(error) {
    let err = new ErrorResponseBuilder('Authentication Failed')
                                        .status(401)
                                        .errorType('OAuthError')
                                        .errorCode('CA-1')
                                        .build();
    return next(err);
  }
}

const checkUser = (req, res, next) => {
  if(!req.userData) {
    let error = new ErrorResponseBuilder('Authentication Failed')
                                              .status(401)
                                              .errorType('OAuthError')
                                              .errorCode('CA-2')
                                              .build();
    return next(error);
  }
  next();
}

const checkPrevilieges = (req, res, next) => {
  if(!req.userData.isAdmin){
    let error = new ErrorResponseBuilder('You need admin previleges to perform this operation')
                                .status(401)
                                .errorType('OAuthError')
                                .errorCode('CA-3')
                                .build();
    return next(error);
  }
  next();
}

module.exports = {
  decodeToken,
  checkUser,
  checkPrevilieges
}
