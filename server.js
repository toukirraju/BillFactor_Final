const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
require("./app/Database/Connection/Connection");
const passport = require("passport");

app.use(cors());
dotEnv.config({ path: "./config.env" });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require("./app/Passport")(passport);

app.use("/api", require("./app/routers/login&regRoutes"));
// app.use("/api", require("./app/routers/manager.routes"));
app.use("/api", require("./app/routers/morderator.routes"));
app.use("/api/common", require("./app/routers/common.routes"));
app.use("/api/public", require("./app/routers/public.routes"));

// app.get("/", (req, res) => {
//   res.json({
//     message: "hello server",
//   });
// });

//heroku port
if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join("client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on Port ${port}`);
});
