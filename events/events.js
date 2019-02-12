const Request = require('../models/request-model');
const User = require('../models/user-model');
const logger = require('../libraries/log-message');
const ItemHistory = require('../models/item-history-model');

exports.sendRequest = (requestData) => {
  const request = new Request({
    requesterName: requestData.requesterName,
    requesterId: requestData.requesterId,
    receiverId: requestData.receiverId,
    receiverName: requestData.receiverName,
    status: 'Pending'
  });
  request.save()
          .then(result => {
            if(result._id) {
              let requesterNotification = {
                message: `You have sent a friend request to ${requestData.receiverName}`
              };
              let receiverNotification = {
                message: `You have received a friend request from ${requestData.requesterName}`
              };
              User.findOneAndUpdate({_id: requestData.requesterId},
                                    {$push: {notifications: requesterNotification}},
                                    (err, doc) => {
                                      if(err) {
                                        logger.log(err);
                                        return;
                                      }
              })
              User.findOneAndUpdate({_id: requestData.receiverId},
                                    {$push: {notifications: receiverNotification}},
                                    (err, doc) => {
                                      if(err) {
                                        logger.log(err);
                                        return;
                                      }
              });
            }
          })
          .catch(error => {
            logger.log(error);
            return;
          })
}

exports.updateRequest = (requestData) => {
  Request.findOneAndUpdate({_id: requestData._id},{$set:{status: 'Accepted'}})
        .then(docs => {
          // check docs. sometimes status is not updating properly
          let requesterNotification = {
            message: `Your friend request was accepted by ${requestData.receiverName}`
          };
          let receiverNotification = {
            message: `You have accepted friend request of ${requestData.requesterName}`
          };
          User.findOneAndUpdate({_id: requestData.receiverId},
                                {$push: {friends: requestData.requesterId, notifications: receiverNotification}},
                                (err, done) => {
                                  if(err) {
                                    logger.log(err);
                                    return;
                                  }
            User.findOneAndUpdate({_id: requestData.requesterId},
                                  {$push: {friends: requestData.receiverId, notifications: requesterNotification}},
                                  (err, done) => {
                                    if(err) {
                                      logger.log(err);
                                      return;
                                    }
            })
          })
        })
        .catch(error => {
          logger.log(error);
          return;
        })
}

exports.trackItemHistory = (reqData) => {
  const historyModel = {
    itemId: reqData.itemId,
    listId: reqData.listId,
    parent: reqData.parent,
    itemType: reqData.itemType,
    operatedById: reqData.operatedById,
    operatedByName: reqData.operatedByName,
    operationName: reqData.operationName,
    previliegedUsers: reqData.previliegedUsers,
    creator: reqData.creator,
    creatorName: reqData.creatorName,
    createdOn: reqData.createdOn,
    title: reqData.title,
    status: reqData.status || 'open'
  };

  if (reqData.oldObject) {
    historyModel.oldObject = reqData.oldObject;
  }

  const itemBackup = new ItemHistory(historyModel);

  itemBackup.save()
            .then(doc => {})
            .catch(error => {
              logger.log(error);
              return;
            })
}

exports.deleteLastAction = (id) => {
  ItemHistory.findByIdAndDelete({_id: id})
            .then(doc => {})
            .catch(error => {
              logger.log(error);
              return;
            })
}