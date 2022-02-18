const router = require("express").Router();
const authenticate = require("../authenticate");

const {
  createApartment,
  allApartment,
  updateApartment,
  addApartment,
  removeApartment,
} = require("../Controllers/moderatorControllers/apartmentController");

const {
  createRenter,
  allRenters,
  updateRenter,
  removeRenter,
} = require("../Controllers/moderatorControllers/renterController");

const {
  assignRenter,
  removeAssignedRenter,
} = require("../Controllers/moderatorControllers/assignRenterController");

////////////////// APARTMENTS ROUTE ////////////////////

router.post("/createfloors", authenticate, createApartment); ////

router.get(`/apartments`, authenticate, allApartment); ////

router.post("/addApartment", authenticate, addApartment); ////

router.post("/updateApartment", authenticate, updateApartment); ///

router.delete("/:apartmentId", authenticate, removeApartment); ////

////////////////// RENTER ROUTE ////////////////////

router.post("/renter/createRenter", authenticate, createRenter);

router.get(`/renter`, authenticate, allRenters);

router.post("/renter/updateRenter", authenticate, updateRenter); ///

router.delete("/renter/:renterId", authenticate, removeRenter); ////

//////////////////  ASSIGN ROUTE ////////////////////

router.post("/assign", authenticate, assignRenter);

router.post("/removeAssigned", authenticate, removeAssignedRenter);

module.exports = router;
