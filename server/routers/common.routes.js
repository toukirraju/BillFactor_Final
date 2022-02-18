const router = require("express").Router();
const authenticate = require("../authenticate");

const {
  createBill,
  getTempBill,
  allTransactions,
  getMonthlyBill,
} = require("../Controllers/mod_manCommon/billController");

////////////////// Bill ROUTE ////////////////////

router.post("/bill/createBill", authenticate, createBill); ////

router.get(`/bill/tempbill/:renterId`, authenticate, getTempBill); ////

router.get("/bill", authenticate, allTransactions); ////

router.get("/bill/:month/:year", authenticate, getMonthlyBill); ////

module.exports = router;
