const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//username is unique can be used to find a document
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
