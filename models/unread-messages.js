const mongoose = require('mongoose');
const shortId = require('shortid');

const UnreadMessagesSchema = mongoose.Schema({
  _id: {type: String, default: shortId.generate, required: true},
  msgid: {type: String, required: true, ref: 'Item'},
  users: [{type: String, required: true, ref: 'User'}],
})

module.exports = mongoose.model('Unreadmessage', UnreadMessagesSchema);
