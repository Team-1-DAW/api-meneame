const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, require:true},
  name: {type: String, require:true},
  surname: {type: String, require:true},
  _id: {type: String, require:true},
  profile: {type: String, require:true}
})


module.exports = userSchema