const router = require("express").Router();

const { registration, login } = require("../Controllers/login&RegController");

//Registration Route

router.post("/register", registration);

//Login Route

router.post("/login", login);

module.exports = router;
