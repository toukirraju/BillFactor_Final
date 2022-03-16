const RenterModel = require("../../Database/Model/moderatorModels/renterModel");
const ApartmentModel = require("../../Database/Model/moderatorModels/apartmentModel");
const BillModel = require("../../Database/Model/mod_manCommon/BillModel");
const TempBillModel = require("../../Database/Model/mod_manCommon/TempBillModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  apartmentWidget(req, res) {
    const { name, _id, role, homeId, homeOwner } = req.user;
    ApartmentModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((doc) => {
        if (doc) {
          const allApartments = doc.floors.map((item) => item.apartNo);
          let apartments = Object.values(
            allApartments.reduce((previousValue, currentValue) => {
              previousValue[currentValue] = previousValue[currentValue] || [
                currentValue,
                0,
              ];
              previousValue[currentValue][1]++;

              return previousValue;
            }, {})
          ).map((value) => value[0]);

          const unavailable = [];
          const available = [];
          doc.floors.map((item) =>
            item.status === "unavailable"
              ? unavailable.push(item)
              : available.push(item)
          );

          const apWidged = {
            totalApartments: apartments.length,
            totalRooms: doc.floors.length,
            availableRooms: available.length,
            unavailableRooms: unavailable.length,
          };

          res.status(200).json(apWidged);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
        // res.send(Data);
      })
      .catch((error) => serverError(res, error));
  },

  renterWidget(req, res) {
    const { name, _id, role, homeId, homeOwner } = req.user;
    RenterModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((allrenters) => {
        if (allrenters) {
          const activeRenter = [];
          const inactiveRenter = [];
          allrenters.renters.map((item) =>
            item.apartmentId === "" && item.apartNo === "" && item.roomNo === ""
              ? inactiveRenter.push(item)
              : activeRenter.push(item)
          );

          const renterWidged = {
            totalRenters: allrenters.renters.length,
            activeRenter: activeRenter.length,
            inactiveRenter: inactiveRenter.length,
          };

          res.status(200).json(renterWidged);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
        // res.send(Data);
      })
      .catch((error) => serverError(res, error));
  },

  billWidget(req, res) {
    const { name, _id, role, homeId, homeOwner } = req.user;
    ApartmentModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((doc) => {
        if (doc) {
          const unavailable = [];
          const available = [];
          doc.floors.map((item) =>
            item.status === "unavailable"
              ? unavailable.push(item)
              : available.push(item)
          );

          var totalPayable = 0;
          for (var i in unavailable) {
            totalPayable += unavailable[i].totalRent;
          }

          BillModel.findOne({
            // adminId: _id,
            adminId: role === "" || role === undefined ? _id : homeId,
          })
            .then((result) => {
              if (result !== null) {
                if (result.bills.length !== 0) {
                  let paidBill = [];
                  result.bills.filter((i) => {
                    if (
                      new Date(i.date).getMonth() + 1 ===
                        new Date().getMonth() + 1 &&
                      new Date(i.date).getFullYear() ===
                        new Date().getFullYear()
                    ) {
                      return paidBill.push(i);
                    }
                  });

                  var totalPaidBill = 0;
                  for (var i in paidBill) {
                    totalPaidBill += paidBill[i].payableAmount;
                  }
                  // res.status(200).json(totalPaidBill);

                  TempBillModel.findOne({
                    // adminId: _id,
                    adminId: role === "" || role === undefined ? _id : homeId,
                  })
                    .then((temp) => {
                      if (temp !== null) {
                        if (temp.tempBills.length !== 0) {
                          var totalTempBill = 0;
                          for (var i in temp.tempBills) {
                            totalTempBill +=
                              temp.tempBills[i].tempDue +
                              temp.tempBills[i].e_bill +
                              temp.tempBills[i].o_bill;
                          }

                          const totalPayableRent =
                            parseInt(totalPayable) + parseInt(totalTempBill);
                          const remainingBill =
                            parseInt(totalPayableRent) -
                            parseInt(totalPaidBill);

                          const billWidged = {
                            paidRenters: paidBill.length,
                            totalPayable: totalPayableRent,
                            totalPaidBill,
                            remainingBill:
                              remainingBill > 0 ? remainingBill : 0,
                          };

                          res.status(200).json(billWidged);
                          // res.status(200).json(totalTempBill);
                        } else {
                          const remainingBill =
                            parseInt(totalPayable) - parseInt(totalPaidBill);

                          const billWidged = {
                            totalPayable,
                            totalPaidBill,
                            remainingBill,
                          };

                          res.status(200).json(billWidged);
                          // return resourceError(res, "Please Create temp");
                        }
                      } else {
                        const remainingBill =
                          parseInt(totalPayable) - parseInt(totalPaidBill);

                        const billWidged = {
                          totalPayable,
                          totalPaidBill,
                          remainingBill,
                        };

                        res.status(200).json(billWidged);
                      }
                    })
                    .catch((error) => serverError(res, error));
                } else {
                  const remainingBill = parseInt(totalPayable) - 0;

                  const billWidged = {
                    totalPayable,
                    totalPaidBill: 0,
                    remainingBill,
                  };

                  res.status(200).json(billWidged);
                }
              } else {
                const remainingBill = parseInt(totalPayable) - 0;

                const billWidged = {
                  totalPayable,
                  totalPaidBill: 0,
                  remainingBill,
                };

                res.status(200).json(billWidged);
                // return resourceError(res, "No bill found");
              }
            })
            .catch((error) => serverError(res, error));
        } else {
          return resourceError(res, "Somthing went wrong");
        }
        // res.send(Data);
      })
      .catch((error) => serverError(res, error));
  },

  yearlyBarChart(req, res) {
    // let { _id } = req.user;
    const { name, _id, role, homeId, homeOwner } = req.user;
    BillModel.findOne({
      // adminId: _id,
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((result) => {
        if (result !== null) {
          if (result.bills.length !== 0) {
            const yearlyBills = [];
            result.bills.filter((i) => {
              if (
                new Date(i.date).getFullYear() === parseInt(req.params.year)
              ) {
                return yearlyBills.push(i);
              }
            });
            var January = 0;
            var February = 0;
            var March = 0;
            var April = 0;
            var May = 0;
            var June = 0;
            var July = 0;
            var August = 0;
            var September = 0;
            var October = 0;
            var November = 0;
            var December = 0;

            for (var i in yearlyBills) {
              if (new Date(yearlyBills[i].date).getMonth() + 1 === 1) {
                January += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 2) {
                February += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 3) {
                March += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 4) {
                April += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 5) {
                May += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 6) {
                June += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 7) {
                July += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 8) {
                August += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 9) {
                September += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 10) {
                October += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 11) {
                November += yearlyBills[i].paidAmount;
              } else if (new Date(yearlyBills[i].date).getMonth() + 1 === 12) {
                December += yearlyBills[i].paidAmount;
              }
              // console.log(yearlyBills[i].date);
            }

            const yearlyTotalBills = {
              January,
              February,
              March,
              April,
              May,
              June,
              July,
              August,
              September,
              October,
              November,
              December,
            };
            res.status(200).json(yearlyTotalBills);
          } else {
            res.status(200).json({
              January: 0,
              February: 0,
              March: 0,
              April: 0,
              May: 0,
              June: 0,
              July: 0,
              August: 0,
              September: 0,
              October: 0,
              November: 0,
              December: 0,
            });
            // return resourceError(res, "No Bill Found");
          }
        } else {
          return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
