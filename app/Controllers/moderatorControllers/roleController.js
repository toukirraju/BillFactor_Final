const LoginDB = require("../../Database/Model/LoginModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  searchManager(req, res) {
    LoginDB.findOne({ _id: req.params.srcId })
      .then((result) => {
        if (result) {
          if (result.type === "manager" && result.role === "sub_manager") {
            // if (
            //   result.role !== "sub_manager"
            //   // &&
            //   // result.homeId !== req.user._id
            // ) {
            const user = {
              name: result.name,
              _id: result._id,
              type: result.type,
              role: result.role,
              homeId: result.homeId,
            };
            res.status(200).json(user);
            // } else {
            //   res.status(200).json({
            //     message: "Role already assigned",
            //   });
            // }
          } else {
            return resourceError(res, "Not found!");
          }
        } else {
          return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },

  assignRole(req, res) {
    let { srcId } = req.params;
    LoginDB.findOneAndUpdate({ _id: srcId }, { $set: req.body }, { new: true })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Update Successfully",
          });
        } else {
          return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },

  getRoledUser(req, res) {
    LoginDB.find({ homeId: req.user._id })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },

  removeRole(req, res) {
    let { srcId } = req.params;
    LoginDB.findOneAndUpdate(
      { _id: srcId },
      { $set: { homeId: "", homeOwner: "" } },
      { new: true }
    )
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Role removed",
          });
        } else {
          return resourceError(res, "Something went wrong!");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
