const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempBillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  tempBills: [
    {
      renterId: {
        type: String,
      },
      renterName: {
        type: String,
      },
      e_bill: {
        type: Number,
      },
      o_bill: {
        type: Number,
      },
      tempDue: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const TempBillModel = mongoose.model("TempBillModel", tempBillSchema);
module.exports = TempBillModel;
