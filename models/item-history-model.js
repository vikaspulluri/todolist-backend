const mongoose = require('mongoose');
const shortId = require('shortid');

const ItemHistorySchema = mongoose.Schema({
  _id: {type: String, required: true, unique: true, default: shortId.generate},
  itemId: {type: String, required: true},
  listId: {type: String, required: true},
  parent: {type: String, required: true},
  itemType: {type: String, default: 'main', required: true}, // possible values are main/sub
  operatedById: {type: String, required: true},
  operatedByName: {type: String, required: true},
  operationName: {type: String, required: true},
  previliegedUsers: {type: [String], required: true},
  operatedDate: {type: Date, required: true, default: Date.now},
  createdOn: {type: String, required: true},
  creator: {type: String, required: true},
  creatorName: {type: String, required: true},
  children: {type: [Object], required: false},
  title: {type: String, required: true},
  status: {type: String, required: false, default: 'open'},
  oldObject: {
    title: {type: String, required: false},
    status: {type: String, required: false},
    completionDate: {type: String, required: false},
    completedBy: {type: String, required: false}
  }
});

module.exports = mongoose.model('Itemhistory', ItemHistorySchema);
