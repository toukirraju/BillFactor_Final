const MessInfo = require("../Database/Model/MessInfoModel");

const { serverError, resourceError } = require("../../server/utils/error");

module.exports = {
  createMess(req, res) {
    let { messId, messName, totalRoom, totalRent, perRoomRent } = req.body;
    let messData = new MessInfo({
      //   managerId: userId,
      messId,
      messName,
      totalRoom,
      totalRent,
      perRoomRent,
    });
    MessInfo.find({ messId })
      .then((mess) => {
        if (mess.length == 0) {
          messData
            .save()
            .then((response) => {
              res.status(201).json({
                message: "Mess Created Successfully",
                mess: response.data,
              });
            })
            .catch((error) => serverError(res, error));
        } else {
          return resourceError(res, "Mess Already Created!");
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },
  updateMess(req, res) {},
  removeMess(req, res) {},
};
