const List = require('../models/list-model');
const User = require('../models/user-model');

const {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');
const validateRequest = require('../libraries/validate-request');
const logger = require('../libraries/log-message');

exports.createList = (req, res, next) => {
  let reqValidity = validateRequest(req, 'title','description');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('LC-CL-1').build();
    return next(error);
  }
  const list = new List({
    title: req.body.title,
    description: req.body.description,
    owner: req.userData.userId,
  });
  list.save()
      .then(doc => {
       let docUpdated = {
            title: doc.title,
            description: doc.description,
            createdDate: doc.createdDate,
            owner: doc.owner,
            name: req.userData.firstName,
            id: doc._id
       };
        let jsonResponse = new SuccessResponseBuilder('List created successfully!!!').data(docUpdated).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'LC-CL-1');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-CL-2').errorType('UnknownError').build();
        return next(err);
      })
}

exports.getOwnLists = (req, res, next) => {
  List.find({'owner': req.userData.userId})
      .exec()
      .then(docs => {
        let docsUpdated = docs.map(doc => {
          return  {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            createdDate: doc.createdDate,
            owner: doc.owner,
            creatorName: req.userData.firstName,
            status: doc.status,
            completionDate: doc.completionDate,
            completedByName: doc.completedByName
          };
        });
        let jsonResponse = new SuccessResponseBuilder('Lists fetched successfully!!!').data(docsUpdated).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-GOL-1');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-GOL-1').errorType('UnknownError').build();
        return next(err);
      })
}

exports.getFriendsLists = (req, res, next) => {
  if(!req.body.friends || !Array.isArray(req.body.friends)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('LC-GFL-1').build();
    return next(error);
  }
  let friends = req.body.friends; // should be array of id's
  List.find({'owner': {$in:friends}})
      .select("-lastModifiedOn -v")
      .exec()
      .then(docs => {
        let docsUpdated = docs.map(doc => {
          return  {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            createdDate: doc.createdDate,
            owner: doc.owner,
            status: doc.status,
            completionDate: doc.completionDate,
            completedByName: doc.completedByName
          };
        });
        User.find({'_id':{$in: friends}})
            .select('-email -password -createdDate -hasAdminPrevilieges -notifications -friends -receivedRequests -sentRequests -v')
            .exec()
            .then(userDocs => {
              let newDocs = docsUpdated.map(x => {
                let index = userDocs.filter(f => f._id == x.owner);
                x.creatorName = index[0].firstName;
                return x;
              });
              let jsonResponse = new SuccessResponseBuilder('Firneds Lists fetched successfully!!!').data(newDocs).build();
              res.status(200).send(jsonResponse);
            })
            .catch(error => {
              logger.log(error, req, 'UC-GFL-1');
              let err = new ErrorResponseBuilder().status(500).errorCode('LC-GFL-1').errorType('UnknownError').build();
              return next(err);
            })
      })
      .catch(error => {
        logger.log(error, req, 'UC-GFL-3');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-GFL-3').errorType('UnknownError').build();
        return next(err);
      })
}

exports.deleteListById = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('LC-DLBI-1').build();
    return next(error);
  }
  List.findOneAndDelete({_id: req.body.id})
      .then(docs => {
       let jsonResponse = new SuccessResponseBuilder('List deleted successfully!!!').data().build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-DLBI-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-DLBI-2').errorType('UnknownError').build();
        return next(err);
      })
}

exports.updateListById = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('LC-ULBI-1').build();
    return next(error);
  }
  // List.countDocuments({_id: req.body.id, owner: req.body.owner})
  //     .then(count => {
  //       if(count < 1) {
  //         let error = new ErrorResponseBuilder("You don't have permissions to edit this list").errorType('OAuthError').status(403).errorCode('LC-ULBI-2').build();
  //         return next(error);
  //       }
  //     })
  List.findOneAndUpdate({_id: req.body.id},{title: req.body.title, description: req.body.description,lastModifiedOn: new Date().toISOString(), lastModifiedBy: req.body.lastModifiedBy, lastModifiedByName: req.body.lastModifiedByName},{new: true})
      .then(doc => {
        let sentResponse = {
          id: doc._id,
          title: doc.title,
          description: doc.description,
          status: doc.status,
          owner: doc.owner,
          createdDate: doc.createdDate,
          name: req.userData.firstName,
          lastModifiedBy: doc.lastModifiedBy,
          lastModifiedByName: doc.lastModifiedByName
        };
        let jsonResponse = new SuccessResponseBuilder('List Updated successfully!!!').data(sentResponse).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-ULBI-3');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-ULBI-3').errorType('UnknownError').build();
        return next(err);
      })
}

exports.updateListStatusById = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id', 'completedByName');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('LC-ULSBI-1').build();
    return next(error);
  }
  List.findOneAndUpdate({_id: req.body.id}, {status: 'done', completionDate: new Date().toISOString(), completedByName: req.body.completedByName}, {new: true})
      .then(doc => {
        let jsonResponse = new SuccessResponseBuilder('List Updated successfully!!!').data(doc).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'UC-ULSBI-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('LC-ULSBI-2').errorType('UnknownError').build();
        return next(err);
      })
}
