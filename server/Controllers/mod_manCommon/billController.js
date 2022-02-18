const BillModel = require("../../Database/Model/mod_manCommon/BillModel");
const TempBillModel = require("../../Database/Model/mod_manCommon/TempBillModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createBill(req, res) {
    const { name, _id } = req.user;

    let objData = new Object({
      renterId: req.body.renterId,
      renterName: req.body.renterName,

      e_bill: req.body.e_bill,
      o_bill: req.body.o_bill,
      totalRent: req.body.totalRent,
      payableAmount: req.body.payableAmount,
      paidAmount: req.body.paidAmount,
      due: req.body.due,
    });

    let billData = new BillModel({
      name,
      adminId: _id,
      bills: objData,
    });

    let tempObj = new Object({
      renterId: req.body.renterId,
      e_bill: 0,
      o_bill: 0,
      tempDue: req.body.due,
    });

    let tempData = new TempBillModel({
      name,
      adminId: _id,
      tempBills: tempObj,
    });

    BillModel.findOne({ adminId: _id })
      .then((payment) => {
        if (payment == null) {
          billData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Created Successfully",
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          if (payment.bills.length == 0) {
            payment.bills.push(objData);
            payment
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Created Successfully",
                });
              })
              .catch((error) => serverError(res, error));
          } else {
            payment.bills.push(objData);
            payment
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Created Successfully",
                });
              })
              .catch((error) => serverError(res, error));
          }
        }
      })
      .catch((error) => {
        serverError(res, error);
      });

    TempBillModel.findOne({ adminId: _id })
      .then((temp) => {
        if (temp == null) {
          tempData.save();
        } else {
          if (temp.tempBills.length == 0) {
            temp.tempBills.push(tempObj);
            temp.save();
          } else {
            let existingTempBill;
            temp.tempBills.map((item) => {
              if (item.renterId == req.body.renterId) {
                return (existingTempBill = item);
              }
            });

            if (existingTempBill) {
              existingTempBill.e_bill = 0;
              existingTempBill.o_bill = 0;
              existingTempBill.tempDue = req.body.due;
              temp.save();
            } else {
              temp.tempBills.push(tempObj);
              temp.save();
            }
          }
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  getTempBill(req, res) {
    let { _id } = req.user;

    let tempObj = new Object({
      e_bill: 0,
      o_bill: 0,
      tempDue: 0,
    });

    TempBillModel.findOne({ adminId: _id })
      .then((temp) => {
        if (temp != null) {
          if (temp.tempBills.length != 0) {
            let existingTempBill;
            temp.tempBills.map((item) => {
              if (item.renterId === req.params.renterId) {
                return (existingTempBill = item);
              } else {
                return (existingTempBill = tempObj);
              }
            });
            res.status(200).json(existingTempBill);
          } else {
            return resourceError(res, "Please Create temp");
          }
        } else {
          return resourceError(res, "Temp not found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  allTransactions(req, res) {
    let { _id } = req.user;

    BillModel.findOne({ adminId: _id })
      .then((result) => {
        if (result != null) {
          if (result.bills.length != 0) {
            res.status(200).json(result);
          } else {
            return resourceError(res, "No Bill Found");
          }
        } else {
          return resourceError(res, "No bill found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  getMonthlyBill(req, res) {
    let { _id } = req.user;

    BillModel.findOne({ adminId: _id })
      .then((result) => {
        if (result != null) {
          if (result.bills.length != 0) {
            let monthlyData = [];
            result.bills.filter((i) => {
              if (
                new Date(i.date).getMonth() + 1 ===
                  parseInt(req.params.month) &&
                new Date(i.date).getFullYear() === parseInt(req.params.year)
              ) {
                return monthlyData.push(i);
              }
            });

            res.status(200).json(monthlyData);
          } else {
            return resourceError(res, "No Bill Found");
          }
        } else {
          return resourceError(res, "No bill found");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
