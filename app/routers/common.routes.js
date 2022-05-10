const router = require("express").Router();
const authenticate = require("../authenticate");

const {
  createBill,
  getTempBill,
  allTransactions,
  getMonthlyBill,
  createTemp,
  allTempBills,
  removeBill,
  payableRenters,
  updateTempBill,
} = require("../Controllers/mod_manCommon/billController");
const {
  apartmentWidget,
  renterWidget,
  billWidget,
  yearlyBarChart,
} = require("../Controllers/mod_manCommon/dashboardController");

////////////////// Bill ROUTE ////////////////////

router.post("/bill/createBill", authenticate, createBill); ////

router.get(`/bill/tempbill/:renterId`, authenticate, getTempBill); ////

router.post(`/bill/tempbill/create`, authenticate, createTemp);

router.post("/bill/tempbill/updateTemp", authenticate, updateTempBill);

router.get(`/bill/tempbill`, authenticate, allTempBills);

router.get("/bill", authenticate, allTransactions); ////

router.get("/bill/:month/:year", authenticate, getMonthlyBill); ////

router.delete("/bill/:_id", authenticate, removeBill); ////

router.get("/payable/:month/:year", authenticate, payableRenters);

////////////////// Dashboard ROUTE ////////////////////

router.get("/dashboard/apartmentWidget", authenticate, apartmentWidget); ////

router.get("/dashboard/renterWidget", authenticate, renterWidget); ////

router.get("/dashboard/billWidget", authenticate, billWidget); ////

router.get("/dashboard/:year", authenticate, yearlyBarChart); ////

module.exports = router;
