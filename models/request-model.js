const mongoose = require('mongoose');
const shortId = require('shortid');

const RequestSchema = mongoose.Schema({
  _id: {type: String, unique: true, required: true, default: shortId.generate},
  requesterName: {type: String, required: true},
  requesterId: {type: String, required: true},
  receiverName: {type: String, required: true},
  receiverId: {type: String, required: true},
  status: {type: String, required: true, default: 'Pending'}
});

module.exports = mongoose.model('Request', RequestSchema);
