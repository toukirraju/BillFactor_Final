const RenterModel = require("../../Database/Model/moderatorModels/renterModel");
const ApartmentModel = require("../../Database/Model/moderatorModels/apartmentModel");
const BillModel = require("../../Database/Model/mod_manCommon/BillModel");
const TempBillModel = require("../../Database/Model/mod_manCommon/TempBillModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  renterDetails(req, res) {
    RenterModel.findOne({ adminId: req.user._id })
      .then((renter) => {
        let renterData = {};
        if (renter) {
          renter.renters.filter((item) => {
            if (item._id == req.params.renterId) {
              return (renterData = item);
            }
          });
        } else {
          return resourceError(res, "Somthing went wrong");
        }
        ApartmentModel.findOne({ adminId: req.user._id })
          .then((doc) => {
            let apartmentData = {};
            if (doc) {
              doc.floors.filter((i, index) => {
                if (i.renterId == req.params.renterId) {
                  return (apartmentData = i);
                }
              });

              //   apartData.push({ apartment: apartmentData });
              // res.send(apartmentData);
            } else {
              return resourceError(res, "Somthing went wrong");
            }
            // res.send(Data);

            BillModel.findOne({ adminId: req.user._id })
              .then((result) => {
                if (result != null) {
                  if (result.bills.length != 0) {
                    let billData = [];
                    result.bills.filter((billItem) => {
                      if (billItem.renterId == req.params.renterId) {
                        billData.push(billItem);
                        // return (billData = i);
                      }
                    });

                    let tempObj = new Object({
                      e_bill: 0,
                      o_bill: 0,
                      tempDue: 0,
                    });

                    TempBillModel.findOne({ adminId: req.user._id })
                      .then((temp) => {
                        if (temp != null) {
                          if (temp.tempBills.length != 0) {
                            let existingTempBill;
                            temp.tempBills.map((item) => {
                              if (item.renterId === req.params.renterId) {
                                return (existingTempBill = item);
                              }
                            });

                            const profileDetails = {
                              renterData,
                              apartmentData,
                              tempbill: existingTempBill,
                              bills: billData,
                            };

                            res.status(200).json(profileDetails);
                            // res.status(200).json(existingTempBill);
                          } else {
                            return resourceError(res, "Please Create temp");
                          }
                        } else {
                          // return resourceError(res, "Temp not found");
                          res.status(200).json(tempObj);
                        }
                      })
                      .catch((error) => serverError(res, error));
                  } else {
                    return resourceError(res, "No Bill Found");
                  }
                } else {
                  return resourceError(res, "No bill found");
                }
              })
              .catch((error) => serverError(res, error));
          })
          .catch((error) => serverError(res, error));
        //   Data.push(...Data, { renter: renterData });
        //   res.send(renterData);
      })
      .catch((error) => serverError(res, error));
  },
};
