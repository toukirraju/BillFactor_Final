const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
require("./Database/Connection/Connection");
const passport = require("passport");

app.use(cors());
dotEnv.config({ path: "./config.env" });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require("./Passport")(passport);

app.use("/api", require("./routers/login&regRoutes"));
app.use("/api", require("./routers/manager.routes"));
app.use("/api", require("./routers/morderator.routes"));
app.use("/api/common", require("./routers/common.routes"));

app.get("/", (req, res) => {
  res.json({
    message: "hello server",
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
