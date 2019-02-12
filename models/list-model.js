const mongoose = require('mongoose');
const shortId = require('shortid');

const listSchema = mongoose.Schema({
  _id: {type: String, required: true, unique: true, default: shortId.generate},
  title: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: String, ref: 'User', required: true},
  createdDate: {type: Date, default: Date.now, required: true},
  lastModifiedOn: {type: Date, required: false},
  status: {type: String, required: true, default: 'open'},
  completionDate: {type: String, required: false},
  lastModifiedBy: {type: String, required: false, ref: 'User'},
  lastModifiedByName: {type: String, required: false},
  completedByName: {type: String, required: false}
});

module.exports = mongoose.model('List', listSchema);
