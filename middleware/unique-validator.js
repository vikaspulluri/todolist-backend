const {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');
const config = require('../config/dev.config');

module.exports = function(model, field) {
    return function(req, res, next) {
        model.countDocuments({[field]: req.body[field]})
             .exec()
             .then(docsCount => {
                if(docsCount > 0) {
                    let response = new ErrorResponseBuilder(config.messages.errors[field].validation)
                                        .status(400)
                                        .errorType('DuplicateDataError')
                                        .errorCode('UV-1')
                                        .build();
                    return next(response);
                }
                return next();
             })
             .catch(error => {
                let response = new ErrorResponseBuilder(config.messages.errors.unknown).status(500).errorType('UnknownError').errorCode('UV-2').build();
                return next(response);
            })
    }
}
