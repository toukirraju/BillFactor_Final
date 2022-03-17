const BillModel = require("../../Database/Model/mod_manCommon/BillModel");
const TempBillModel = require("../../Database/Model/mod_manCommon/TempBillModel");
const RenterModel = require("../../Database/Model/moderatorModels/renterModel");
var _ = require("lodash");
const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createBill(req, res) {
    const { name, _id, role, homeId, homeOwner } = req.user;
    let objData = new Object({
      renterId: req.body.renterId,
      renterName: req.body.renterName,

      e_bill: req.body.e_bill,
      o_bill: req.body.o_bill,
      totalRent: req.body.totalRent,
      payableAmount: req.body.payableAmount,
      paidAmount: req.body.paidAmount,
      due: req.body.due,
      date: req.body.date,
    });

    let billData = new BillModel({
      // name,
      // adminId: _id,
      name: role === "" || role === undefined ? name : homeOwner,
      adminId: role === "" || role === undefined ? _id : homeId,
      bills: objData,
    });

    let tempObj = new Object({
      renterId: req.body.renterId,
      renterName: req.body.renterName,
      e_bill: 0,
      o_bill: 0,
      tempDue: req.body.due,
    });

    let tempData = new TempBillModel({
      // name,
      // adminId: _id,
      name: role === "" || role === undefined ? name : homeOwner,
      adminId: role === "" || role === undefined ? _id : homeId,
      tempBills: tempObj,
    });

    BillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
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

    TempBillModel.findOne({
      // adminId: _id,

      adminId: role === "" || role === undefined ? _id : homeId,
    })
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

  removeBill(req, res) {
    BillModel.updateMany({}, { $pull: { bills: { _id: req.params._id } } })
      .then((result) => {
        if (result.modifiedCount) {
          res.status(200).json({
            message: "Successfully Removed ",
            // Floors: response.data,
          });
          // res.send("Successfully Removed Apartment");
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  allTransactions(req, res) {
    let { _id, role, homeId, homeOwner } = req.user;

    BillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
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
    let { _id, role, homeId, homeOwner } = req.user;

    BillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
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

  getTempBill(req, res) {
    let { _id, role, homeId, homeOwner } = req.user;

    let tempObj = new Object({
      e_bill: 0,
      o_bill: 0,
      tempDue: 0,
    });

    TempBillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((temp) => {
        if (temp != null) {
          if (temp.tempBills.length != 0) {
            let existingTempBill;
            temp.tempBills.map((item) => {
              if (item.renterId === req.params.renterId) {
                return (existingTempBill = item);
              }
              // else {
              //   // return (existingTempBill = tempObj);
              // }
            });

            res.status(200).json(existingTempBill);
          } else {
            return resourceError(res, "Please Create temp");
          }
        } else {
          // return resourceError(res, "Temp not found");
          res.status(200).json(tempObj);
        }
      })
      .catch((error) => serverError(res, error));
  },

  createTemp(req, res) {
    const { name, _id, role, homeId, homeOwner } = req.user;
    let tempObj = new Object({
      renterId: req.body.renterId,
      renterName: req.body.renterName,
      e_bill: req.body.e_bill,
      o_bill: req.body.o_bill,
      tempDue: req.body.tempDue,
    });

    let tempData = new TempBillModel({
      // name: name,
      // adminId: _id,
      name: role === "" || role === undefined ? name : homeOwner,
      adminId: role === "" || role === undefined ? _id : homeId,
      tempBills: tempObj,
    });

    TempBillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((temp) => {
        if (temp == null) {
          tempData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Created Successfully",
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          if (temp.tempBills.length == 0) {
            temp.tempBills.push(tempObj);
            temp
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Created Successfully",
                });
              })
              .catch((error) => serverError(res, error));
          } else {
            let existingTempBill;
            temp.tempBills.map((item) => {
              if (item.renterId == req.body.renterId) {
                return (existingTempBill = item);
              }
            });

            if (existingTempBill) {
              existingTempBill.e_bill =
                parseInt(existingTempBill.e_bill) + parseInt(req.body.e_bill);
              existingTempBill.o_bill =
                parseInt(existingTempBill.o_bill) + parseInt(req.body.o_bill);
              existingTempBill.tempDue =
                parseInt(existingTempBill.tempDue) + parseInt(req.body.tempDue);
              temp
                .save()
                .then((response) => {
                  res.status(201).json({
                    message: "update Successfully",
                  });
                })
                .catch((error) => serverError(res, error));
            } else {
              temp.tempBills.push(tempObj);
              temp
                .save()
                .then((response) => {
                  res.status(201).json({
                    message: "Created Successfully",
                  });
                })
                .catch((error) => serverError(res, error));
            }
          }
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  allTempBills(req, res) {
    let { _id, role, homeId, homeOwner } = req.user;

    TempBillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((result) => {
        if (result != null) {
          if (result.tempBills.length != 0) {
            res.status(200).json(result.tempBills);
          } else {
            return resourceError(res, "No TempBill Found");
          }
        } else {
          return resourceError(res, "No TempBill found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  payableRenters(req, res) {
    let { _id, role, homeId, homeOwner } = req.user;

    BillModel.findOne({
      // adminId: "1400181593",
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((result) => {
        if (result !== null) {
          if (result.bills.length !== 0) {
            let perMonthBills = [];
            result.bills.filter((i) => {
              if (
                new Date(i.date).getMonth() + 1 ===
                  parseInt(req.params.month) &&
                new Date(i.date).getFullYear() === parseInt(req.params.year)
              ) {
                return perMonthBills.push(i);
              }
            });

            RenterModel.findOne({
              // adminId: _id
              // adminId: "1400181593",
              adminId: role === "" || role === undefined ? _id : homeId,
            })
              .then((result) => {
                if (result != null) {
                  if (result.renters.length != 0) {
                    var totalRenters = result.renters;

                    for (var i = perMonthBills.length - 1; i >= 0; i--) {
                      for (var j = 0; j < totalRenters.length; j++) {
                        if (
                          perMonthBills[i].renterId ===
                          totalRenters[j]._id.toString()
                        ) {
                          totalRenters.splice(j, 1);
                        }
                      }
                    }

                    res.status(200).json(totalRenters);
                  } else {
                    return resourceError(res, "Please create renter");
                  }
                } else {
                  return resourceError(res, "Something went wrong!");
                }
              })
              .catch((error) => serverError(res, error));
            // res.status(200).json(perMonthBills);
          } else {
            RenterModel.findOne({
              // adminId: "1400181593",
              adminId: role === "" || role === undefined ? _id : homeId,
            })
              .then((result) => {
                if (result != null) {
                  if (result.renters.length != 0) {
                    res.status(200).json(result.renters);
                  } else {
                    return resourceError(res, "Please create renter");
                  }
                } else {
                  return resourceError(res, "No renter found");
                }
              })
              .catch((error) => serverError(res, error));
            // return resourceError(res, "No Bill Found");
          }
        } else {
          RenterModel.findOne({
            // adminId: "1400181593",
            adminId: role === "" || role === undefined ? _id : homeId,
          })
            .then((result) => {
              if (result != null) {
                if (result.renters.length != 0) {
                  res.status(200).json(result.renters);
                } else {
                  return resourceError(res, "Please create renter");
                }
              } else {
                return resourceError(res, "No renter found");
              }
            })
            .catch((error) => serverError(res, error));
          // res.status(200).json(result);
          // return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
