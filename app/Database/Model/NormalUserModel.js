const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normalUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  messId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const NormalUserModel = mongoose.model("NormalUserModel", normalUserSchema);
module.exports = NormalUserModel;
