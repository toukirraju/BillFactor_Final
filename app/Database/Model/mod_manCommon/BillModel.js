const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  bills: [
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

      totalRent: {
        type: Number,
      },
      payableAmount: {
        type: Number,
      },
      paidAmount: {
        type: Number,
      },
      due: {
        type: Number,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const BillModel = mongoose.model("BillModel", billSchema);
module.exports = BillModel;
