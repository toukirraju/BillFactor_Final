const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  floors: [
    {
      level: {
        type: String,
      },
      apartNo: {
        type: String,
      },
      roomNo: {
        type: String,
      },
      rent: {
        type: Number,
      },
      gasbill: {
        type: Number,
      },
      waterbill: {
        type: Number,
      },
      f_bill: {
        type: Number,
      },
      c_service: {
        type: Number,
      },
      totalRent: {
        type: Number,
      },
      status: {
        type: String,
      },
      renterId: {
        type: String,
      },
      renterName: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const ApartmentModel = mongoose.model("ApartmentModel", apartmentSchema);
module.exports = ApartmentModel;
