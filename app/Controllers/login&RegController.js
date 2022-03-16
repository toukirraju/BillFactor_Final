const Manager = require("../Database/Model/ManagerModel");
const User = require("../Database/Model/NormalUserModel");
const Login = require("../Database/Model/LoginModel");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const { serverError, resourceError } = require("../utils/error");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  registration(req, res) {
    let { name, phone, email, messId, password, role, type } = req.body;

    Login.findOne({ _id: phone })
      .then((user) => {
        if (user) {
          return resourceError(res, "Phone Number Already Exists.");
        }

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            return resourceError(res, "Server Error Occurred.");
          }
          let user = new Login({
            _id: phone,
            name,
            password: hash,
            type,
            role,
          });
          user
            .save()
            .then((user) => {
              res.status(201).json({
                message: "Register Successfully",
                // user,
              });
              return user;
            })

            .then((user) => {
              if (user.type === "normal_user") {
                let setUser = new User({ name, phone, email, messId });
                return setUser.save();
              } else if (user.type === "manager") {
                let setManager = new Manager({ name, phone, email, messId });
                return setManager.save();
              }
            })
            .catch((error) => serverError(res, error));
        });
      })
      .catch((error) => {
        serverError(res, error);
      });
    // }
  },

  login(req, res) {
    const { phone, password } = req.body;
    const validate = loginValidator({ phone, password });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }
    Login.findOne({ _id: phone })

      .then((user) => {
        if (!user) {
          return resourceError(res, "User Not Found");
        }

        if (user.type === "normal_user") {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return serverError(res, err);
            }

            if (!result) {
              return resourceError(res, "Password dose not match");
            }

            let token = jwt.sign(
              {
                _id: user._id,
                name: user.name,
                type: user.type,
              },
              process.env.SECRET,
              { expiresIn: "2h" }
            );

            res.status(200).json({
              message: "Login Successfull",
              _id: user._id,
              token: `Bearer ${token}`,
              name: user.name,
              type: user.type,
            });
          });
        } else if (user.type === "manager") {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return serverError(res, err);
            }

            if (!result) {
              return resourceError(res, "Password dose not match");
            }

            if (user.role === "sub_manager") {
              let token = jwt.sign(
                {
                  _id: user._id,
                  name: user.name,
                  type: user.type,
                  role: user.role,
                  homeId: user.homeId,
                  homeOwner: user.homeOwner,
                },
                process.env.SECRET,
                { expiresIn: "2h" }
              );

              res.status(200).json({
                _id: user._id,
                token: `Bearer ${token}`,
                name: user.name,
                type: user.type,
                role: user.role,
                homeId: user.homeId,
                homeOwner: user.homeOwner,
              });
            } else {
              let token = jwt.sign(
                {
                  _id: user._id,
                  name: user.name,
                  type: user.type,
                },
                process.env.SECRET,
                { expiresIn: "2h" }
              );

              res.status(200).json({
                message: "Login Successfull",
                _id: user._id,
                token: `Bearer ${token}`,
                name: user.name,
                type: user.type,
              });
            }
          });
        } else {
          res.status(404).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => serverError(res, error));
  },
};
