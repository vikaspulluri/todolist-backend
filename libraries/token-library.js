const jwt = require('jsonwebtoken');

const verifyAuth = (token, cb) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if(err) {
      console.log('Error occured while verifying token');
      return cb(err, null);
    }
    console.log('User verified!!!');
    return cb(null, decoded);
  });
};

module.exports = {
  verifyAuth: verifyAuth
}
