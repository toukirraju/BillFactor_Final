const router = require("express").Router();
const authenticate = require("../authenticate");

const {
  createMess,
  updateMess,
  removeMess,
} = require("../Controllers/managerController");

router.post("/create", authenticate, createMess);

router.post("/update", updateMess);

module.exports = router;
