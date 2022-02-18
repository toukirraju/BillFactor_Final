const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const renterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  renters: [
    {
      renterName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
      nId: {
        type: String,
      },

      advanceRent: {
        type: Number,
      },
      apartmentId: {
        type: String,
      },
      apartNo: {
        type: String,
      },
      roomNo: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const RenterModel = mongoose.model("RenterModel", renterSchema);
module.exports = RenterModel;
