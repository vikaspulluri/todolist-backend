const ItemHistory = require('../models/item-history-model');

const {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');
const validateRequest = require('../libraries/validate-request');
const logger = require('../libraries/log-message');

exports.getLastActivityOnList = (req, res, next) => {
    let reqValidity = validateRequest(req, 'listId');
    if(reqValidity.includes(false)) {
        let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IHC-GLAOL-1').build();
        return next(error);
    }
    ItemHistory.find({listId: req.body.listId, previliegedUsers: req.userData.userId})
                .sort({"operatedDate": -1})
                .limit(1)
                .exec()
                .then(doc => {
                    let docUpdated = doc;
                    if (doc.length > 0) {
                        docUpdated = doc[0];
                    }
                    let jsonResponse = new SuccessResponseBuilder('Item fetched successfully!!!').data(docUpdated).build();
                    res.status(200).send(jsonResponse);
                })
                .catch(error => {
                    logger.log(error, req, 'IHC-GLAOL-2');
                    let err = new ErrorResponseBuilder().status(500).errorCode('IHC-GLAOL-2').errorType('UnknownError').build();
                    return next(err);
                  })
}