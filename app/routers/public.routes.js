const router = require("express").Router();
const authenticate = require("../authenticate");

const {
  renterDetails,
} = require("../Controllers/mod_manCommon/renterProfileCotroller");

////////////////// Public ROUTE ////////////////////

router.get("/profile/:renterId", authenticate, renterDetails); ////

module.exports = router;
