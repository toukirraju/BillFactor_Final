const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
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

const ManagerModel = mongoose.model("ManagerModel", managerSchema);
module.exports = ManagerModel;
