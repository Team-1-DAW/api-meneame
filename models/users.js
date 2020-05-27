const mongoose = require("mongoose");
const UserSchema = require("./schemas/users");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;