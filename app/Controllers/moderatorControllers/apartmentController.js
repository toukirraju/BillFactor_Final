const ApartmentModel = require("../../Database/Model/moderatorModels/apartmentModel");

const { serverError, resourceError } = require("../../utils/error");

module.exports = {
  createApartment(req, res) {
    let { name, adminId, numOfFloors } = req.body;

    const arr = Array.from({ length: numOfFloors }, (_, index) => ({
      level: index + 1,
      apartNo: `A${index + 1}`,
      roomNo: `R${index + 1}`,
      rent: 0,
      gasbill: 0,
      waterbill: 0,
      c_service: 0,
      f_bill: 0,
      totalRent: 0,
      status: "available",
      renterId: "",
      renterName: "",
    }));

    let apartData = new ApartmentModel({
      name,
      adminId,
      floors: arr,
    });
    ApartmentModel.findOne({ adminId })
      .then((apartment) => {
        if (apartment == null) {
          apartData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Created Successfully",
                // Floors: response.data,
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          // console.log(mess.floors);
          if (apartment.floors.length == 0) {
            for (let i = 0; i < numOfFloors; i++) {
              let objData = new Object({
                level: i + 1,
                apartNo: `A${i + 1}`,
                roomNo: `R${i + 1}`,
                rent: 0,
                gasbill: 0,
                waterbill: 0,
                c_service: 0,
                f_bill: 0,
                totalRent: 0,
                status: "available",
                renterId: "",
                renterName: "",
              });

              apartment.floors.push(objData);
            }
            // console.log(mess);
            apartment
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Created Successfully",
                  // Floors: response.data,
                });
              })
              .catch((error) => serverError(res, error));
          } else {
            let menualObj = new Object({
              level: numOfFloors,
              apartNo: `A${numOfFloors}`,
              roomNo: `R${numOfFloors}`,
              rent: 0,
              gasbill: 0,
              waterbill: 0,
              c_service: 0,
              f_bill: 0,
              totalRent: 0,
              status: "available",
              renterId: "",
              renterName: "",
            });

            apartment.floors.push(menualObj);

            apartment
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "Created Successfully",
                  // Floors: response.data,
                });
              })
              .catch((error) => serverError(res, error));
            // return resourceError(res, "Floors Already Created!");
          }
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },

  allApartment(req, res) {
    // let { _id } = req.user;
    const { name, _id, role, homeId, homeOwner } = req.user;
    ApartmentModel.findOne({
      // adminId: _id
      adminId: role === "" || role === undefined ? _id : homeId,
    })
      .then((apartments) => {
        if (apartments != null) {
          if (apartments.floors.length != 0) {
            res.status(200).json(apartments);
          } else {
            return resourceError(res, "Please Create Apartment");
          }
        } else {
          return resourceError(res, "Apartment not found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  addApartment(req, res) {
    // console.log(req.body);
    ApartmentModel.findOne({ adminId: req.user._id })
      .then((result) => {
        // console.log(result);
        if (result) {
          // let apartmentsArray;
          // let n;
          // const apartments = result.floors.map((item, idx) => {
          //   return (n = idx), (apartmentsArray = item);
          // });
          let objData = new Object({
            level: parseInt(req.body.indexNo),
            apartNo: `A${parseInt(req.body.indexNo)}`,
            roomNo: `R${parseInt(req.body.indexNo)}`,
            rent: 0,
            gasbill: 0,
            waterbill: 0,
            c_service: 0,
            f_bill: 0,
            totalRent: 0,
            status: "available",
            renterId: "",
            renterName: "",
          });

          // apartments[req.body.indexNo].push(objData);
          result.floors.push(objData);
          result.save();
          res.status(201).json({
            message: "Added Successfully",
          });
        } else {
          return resourceError(res, "somthing went wrong");
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateApartment(req, res) {
    ApartmentModel.findOne({ adminId: req.user._id })
      .then((doc) => {
        if (doc) {
          let apartmentData;
          // doc.floors.map((item, idx) =>
          //   item.filter((i, index) => {
          //     if (i._id == "62041275a837edf05fce8d24") {
          //       return (n = idx), (apartmentData = i);
          //     }
          //   })
          // );
          doc.floors.filter((i, index) => {
            if (i._id == req.body._id) {
              return (apartmentData = i);
            }
          });
          apartmentData.apartNo = req.body.apartNo;
          apartmentData.roomNo = req.body.roomNo;
          apartmentData.rent = req.body.rent;
          apartmentData.f_bill = req.body.f_bill;
          apartmentData.gasbill = req.body.gasbill;
          apartmentData.waterbill = req.body.waterbill;
          apartmentData.c_service = req.body.c_service;
          apartmentData.totalRent =
            parseInt(req.body.rent) +
            parseInt(req.body.f_bill) +
            parseInt(req.body.gasbill) +
            parseInt(req.body.waterbill) +
            parseInt(req.body.c_service);

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
  removeApartment(req, res) {
    ApartmentModel.updateMany(
      {},
      { $pull: { floors: { _id: req.params.apartmentId } } }
    )
      .then((result) => {
        if (result.modifiedCount) {
          res.status(200).json({
            message: "Successfully Removed Apartment",
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
