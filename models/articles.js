const mongoose = require("mongoose");
const ArticleSchema = require("./schemas/articles");

const ArticleModel = mongoose.model("articles", ArticleSchema);

module.exports = ArticleModel;