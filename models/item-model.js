const mongoose = require('mongoose');
const shortId = require('shortid');

const ItemSchema = mongoose.Schema({
  _id: {type: String, default: shortId.generate, required: true},
  title: {type: String, required: true},
  creator: {type: String, required: true, ref: 'User'},
  addedOn: {type: Date, required: true, default: Date.now},
  listId: {type: String, required: true, ref: 'List'},
  lastModifiedOn: {type: Date, required: false, default: Date.now},
  status: {type: String, required: true, default: 'open'},
  parent: {type: String, required: true}, // if it is the main item, its parent is list id
  lastModifiedBy: {type: String, required: false, ref: 'User'},
  creatorName: {type: String, required: true},
  completionDate: {type: String, required: false},
  completedBy: {type: String, required: false}
})

module.exports = mongoose.model('Item', ItemSchema);
