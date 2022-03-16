const RenterModel = require("../../Database/Model/moderatorModels/renterModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createRenter(req, res) {
    let objData = new Object({
      renterName: req.body.renterName,
      address: req.body.address,
      phone: req.body.phone,
      nId: req.body.nId,
      apartmentId: "",
      apartNo: "",
      roomNo: "",
      advanceRent: req.body.advanceRent,
    });

    let renterData = new RenterModel({
      name: req.user.name,
      adminId: req.user._id,
      renters: objData,
    });
    RenterModel.findOne({ adminId: req.user._id })
      .then((result) => {
        if (result == null) {
          renterData
            .save()
            .then(() => {
              res.status(201).json({
                message: "Successfully Created",
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          if (result.renters.length == 0) {
            result.renters.push(objData);
            result
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Successfully Created",
                });
              })
              .catch((error) => serverError(res, error));
          } else {
            let existingUser = false;
            result.renters.map((renter) => {
              if (renter.phone == req.body.phone) {
                return (existingUser = true);
              }
            });

            if (existingUser) {
              return resourceError(res, "User Already Created!");
            } else {
              result.renters.push(objData);
              result
                .save()
                .then((response) => {
                  res.status(201).json({
                    message: "Created Successfully",
                  });
                })
                .catch((error) => serverError(res, error));
            }
          }
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  allRenters(req, res) {
    // let { _id } = req.user;
    const { name, _id, role, homeId, homeOwner } = req.user;
    RenterModel.findOne({
      // adminId: _id
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((result) => {
        if (result != null) {
          if (result.renters.length != 0) {
            res.status(200).json(result);
          } else {
            return resourceError(res, "Please create renter");
          }
        } else {
          return resourceError(res, "No renter found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateRenter(req, res) {
    RenterModel.findOne({ adminId: req.user._id })
      .then((doc) => {
        if (doc) {
          let renterData;

          doc.renters.filter((i) => {
            if (i._id == req.body._id) {
              return (renterData = i);
            }
          });
          renterData.renterName = req.body.renterName;
          renterData.address = req.body.address;
          renterData.phone = req.body.phone;
          renterData.nId = req.body.nId;
          renterData.advanceRent = req.body.advanceRent;

          doc.save();
          // console.log(apartmentData.rent);
          res.status(200).json({
            message: "Update Successfully",
            // Floors: response.data,
          });
          // res.send(apartmentData);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  removeRenter(req, res) {
    RenterModel.updateMany(
      {},
      { $pull: { renters: { _id: req.params.renterId } } }
    )
      .then((result) => {
        if (result.modifiedCount) {
          res.status(200).json({
            message: "Successfully Removed ",
            // Floors: response.data,
          });
          // res.send("Successfully Removed Apartment");
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
