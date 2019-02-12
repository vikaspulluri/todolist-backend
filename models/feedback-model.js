const mongoose = require('mongoose');
const shortId = require('shortid');

const FeedbackSchema = mongoose.Schema({
  _id: {type: String, required: true, unique: true, default: shortId.generate},
  name: {type: String, required: true},
  userId: {type: String, required: true},
  experience: {type: String, required: true},
  feedback: {type: String, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
