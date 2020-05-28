const mongoose = require("mongoose");
const ArticleSchema = require("./schemas/article");

const ArticleModel = mongoose.model("articles", ArticlesSchema);

module.exports = ArticlesModel;