const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {type: String, require:true},
  resume: {type:String, require:true},
  category: {type: String, require:true},
  url: {type: String, require:true},
  img: {type: String, require:true},
  date: {type: Date,  default: Date.now},
  vote: [{
    positive: {type:Number, require:false},
    negative: {type:Number, require:false}
  }],
  comments:[{
  content: {type: String, require:true},
  date: {type: Date,  default: Date.now},
  user: {
    id: {type:String, require:false}
  }
  }]
})


module.exports = userSchema