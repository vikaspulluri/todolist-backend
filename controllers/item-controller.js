const Item = require('../models/item-model');

const {ErrorResponseBuilder, SuccessResponseBuilder} = require('../libraries/response-builder');
const validateRequest = require('../libraries/validate-request');
const logger = require('../libraries/log-message');

exports.createItem = (req, res, next) => {
  let reqValidity = validateRequest(req, 'title', 'listId', 'creatorName');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IC-CI-1').build();
    return next(error);
  }
  let itemObj = {
    title: req.body.title,
    creator: req.userData.userId,
    listId: req.body.listId,
    creatorName: req.body.creatorName,
    parent: req.body.parent || req.body.listId,
    status: 'open',
    addedOn: req.body.addedOn
  };
  if (req.body._id && req.body.addedOn) {
    itemObj._id = req.body._id;
    itemObj.addedOn = new Date(req.body.addedOn);
  }
  const item = new Item(itemObj);
  item.save()
      .then(doc => {
        let docUpdated = {
          title: doc.title,
          addedOn: doc.createdDate,
          creator: doc.creator,
          creatorName: req.userData.firstName,
          id: doc._id,
          listId: doc.listId,
          parent: doc.parent || doc.listId,
          status: doc.status
        };
        let jsonResponse = new SuccessResponseBuilder('Item created successfully!!!').data(docUpdated).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'IC-CI-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('IC-CI-2').errorType('UnknownError').build();
        return next(err);
      })
}

exports.updateItem = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id', 'title','creator', 'listId', 'editedOn', 'editedBy', 'parent');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IC-EI-1').build();
    return next(error);
  }
  Item.findByIdAndUpdate({ _id: req.body.id }, {title: req.body.title, lastModifiedOn: req.body.editedOn, lastModifiedBy: req.body.editedBy}, {new: true})
      .then(doc => {
        let docUpdated = {
          title: doc.title,
          addedOn: doc.createdDate,
          creator: doc.creator,
          creatorName: req.userData.firstName,
          id: doc._id,
          listId: doc.listId,
          parent: doc.parent,
          status: doc.status
        };
        let jsonResponse = new SuccessResponseBuilder('Item updated successfully!!!').data(docUpdated).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'IC-EI-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('IC-EI-2').errorType('UnknownError').build();
        return next(err);
      })
}

exports.deleteItem = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IC-DI-1').build();
    return next(error);
  }
  Item.findOneAndDelete({_id: req.body.id})
      .then(doc => {
        Item.deleteMany({parent: req.body.id})
            .exec()
            .then(docs => {
              let jsonResponse = new SuccessResponseBuilder('Item deleted successfully!!!').data().build();
              res.status(200).send(jsonResponse);
            })
            .catch(error => {
              logger.log(error, req, 'IC-DI-2');
              let err = new ErrorResponseBuilder().status(500).errorCode('IC-DI-2').errorType('UnknownError').build();
              return next(err);
            })
      })
      .catch(error => {
        logger.log(error, req, 'IC-DI-3');
        let err = new ErrorResponseBuilder().status(500).errorCode('IC-DI-3').errorType('UnknownError').build();
        return next(err);
      })
}

exports.updateItemStatus = (req, res, next) => {
  let reqValidity = validateRequest(req, 'id', 'completedBy', 'editedBy', 'status');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IC-UIS-1').build();
    return next(error);
  }
  Item.findOneAndUpdate({_id: req.body.id}, {status: req.body.status, 
      completedBy: req.body.completedBy,
      completionDate: new Date().toISOString(),
      lastModifiedBy: req.body.editedBy,
      lastModifiedOn: new Date().toISOString()}, {new: true})
      .then(doc => {
        let jsonResponse = new SuccessResponseBuilder('Items updated successfully!!!').data(doc).build();
        res.status(200).send(jsonResponse);
      })
      .catch(error => {
        logger.log(error, req, 'IC-UIS-2');
        let err = new ErrorResponseBuilder().status(500).errorCode('IC-UIS-2').errorType('UnknownError').build();
        return next(err);
      });
}
exports.getItemsByListId = (req, res, next) => {
  // need to get sorted items by date added and limit the results to 6, as well as use skip
  let reqValidity = validateRequest(req, 'listId', 'itemsToSkip');
  if(reqValidity.includes(false)) {
    let error = new ErrorResponseBuilder('Invalid request').errorType('DataValidationError').status(400).errorCode('IC-GIBLI-1').build();
    return next(error);
  }
  let itemsToSkip = parseInt(req.body.itemsToSkip, 10);
  // Item.aggregate([
  //   {$match: {listId: req.body.listId}},
  //   {
  //     $graphLookup: {
  //       from: 'items',
  //       startWith: '$parent',
  //       connectFromField: 'parent',
  //       connectToField: '_id',
  //       as: 'parentItem'
  //     }
  //   },
  //   {$sort: {addedOn: -1}},
  //   {$skip: itemsToSkip},
  //   {$limit: itemsToSkip + 10}
  // ]).then(docs => {
  //   let jsonResponse = new SuccessResponseBuilder('Items fetched successfully!!!').data(docs).build();
  //   res.status(200).send(jsonResponse);
  // })
  Item.find({listId: req.body.listId, parent: req.body.listId})
      .sort({addedOn: -1})
      .limit(itemsToSkip + 10)
      .exec()
      .then(docs => {
        let items = docs;
        let itemIds = docs.map(doc => doc._id);
        Item.find({listId: req.body.listId, parent: {$in: itemIds}})
            .then(subItems => {
              let obj = {items: items, subItems: subItems};
              let jsonResponse = new SuccessResponseBuilder('Items fetched successfully!!!').data(obj).build();
              res.status(200).send(jsonResponse);
            })
      })
  .catch(error => {
    console.log(error);
    logger.log(error, req, 'IC-GIBLI-2');
    let err = new ErrorResponseBuilder().status(500).errorCode('IC-GIBLI-2').errorType('UnknownError').build();
    return next(err);
  });
}
