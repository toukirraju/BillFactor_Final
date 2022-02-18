const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messInfoSchema = new Schema({
  managerId: {
    type: String,
    // required: true,
  },
  messId: {
    type: String,
    required: true,
  },
  messName: {
    type: String,
    required: true,
  },
  totalRoom: {
    type: String,
  },
  totalRent: {
    type: String,
  },
  perRoomRent: {
    type: String,
  },
});

const MessInfoModel = mongoose.model("MessInfoModel", messInfoSchema);
module.exports = MessInfoModel;
