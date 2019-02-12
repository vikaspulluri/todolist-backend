const {ErrorResponseBuilder} = require('../libraries/response-builder');
const shortId = require('shortid');

module.exports = (req, res, next) => {
    if(!req.params.id || !shortId.isValid(req.params.id)) {
        let error = new ErrorResponseBuilder('Invalid Id Provided')
            .status(400)
            .errorType('dataValidationError')
            .errorCode('VIP-1')
            .build();
        return next(error);
    }
    return next();
}