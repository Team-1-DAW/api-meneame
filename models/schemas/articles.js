const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {type: String, require:true},
  resume: {type:String, require:true},
  category: {type: String, require:true},
  url: {type: String, require:true},
  img: {type: String, require:false},
  date: {type: Date,  default: Date.now},
  vote: [{
    positive: {type:Number, default: 0},
    negative: {type:Number, default: 0}
  }],
  comments:[{
  content: {type: String, require:true},
  date: {type: Date,  default: Date.now},
  user: {
    id: {type:String, require:false}
  }
  }]
})


module.exports = articleSchema