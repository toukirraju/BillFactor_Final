const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
