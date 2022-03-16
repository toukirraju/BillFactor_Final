const ApartmentModel = require("../../Database/Model/moderatorModels/apartmentModel");
const RenterModel = require("../../Database/Model/moderatorModels/renterModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  assignRenter(req, res) {
    ApartmentModel.findOne({ adminId: req.user._id })
      .then((allApartments) => {
        if (allApartments) {
          let apartmentData;
          allApartments.floors.filter((i) => {
            if (i._id == req.body.apartmentId) {
              return (apartmentData = i);
            }
          });
          apartmentData.status = "unavailable";
          apartmentData.renterId = req.body.renterId;
          apartmentData.renterName = req.body.renterName;

          allApartments.save();
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));

    /////////////////////////////////////////////////////////////////////////////////
    RenterModel.findOne({ adminId: req.user._id })
      .then((allRenter) => {
        if (allRenter) {
          let renterData;

          allRenter.renters.filter((i) => {
            if (i._id == req.body.renterId) {
              return (renterData = i);
            }
          });
          renterData.apartmentId = req.body.apartmentId;
          renterData.apartNo = req.body.apartNo;
          renterData.roomNo = req.body.roomNo;

          allRenter.save();
          // console.log(apartmentData.rent);
          res.status(200).json({
            message: "Successfully assigned",
            // Floors: response.data,
          });
          // res.send(apartmentData);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  removeAssignedRenter(req, res) {
    ApartmentModel.findOne({ adminId: req.user._id })
      .then((allApartments) => {
        if (allApartments) {
          let apartmentData;
          allApartments.floors.filter((i) => {
            // console.log(i);
            if (i._id == req.body.apartmentId) {
              return (apartmentData = i);
            }
          });
          // console.log(apartmentData);
          // console.log(req.body.apartmentId);
          apartmentData.status = "available";
          apartmentData.renterId = "";
          apartmentData.renterName = "";

          allApartments.save();
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));

    /////////////////////////////////////////////////////////////////////////////////
    RenterModel.findOne({ adminId: req.user._id })
      .then((allRenter) => {
        if (allRenter) {
          let renterData;

          allRenter.renters.filter((i) => {
            if (i._id == req.body.renterId) {
              return (renterData = i);
            }
          });
          renterData.apartmentId = "";
          renterData.apartNo = "";
          renterData.roomNo = "";

          allRenter.save();
          res.status(200).json({
            message: "Successfully removed",
            // Floors: response.data,
          });
          // res.send(apartmentData);
        } else {
          return resourceError(res, "Somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
