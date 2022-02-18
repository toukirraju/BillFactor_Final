import React, { useEffect } from "react";
import "../moderatorPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewApartment,
  allApartments,
} from "../../../redux/slices/apartmentSlice";
import CircularNavBarTop from "../circularNavBar/CircularNavBarTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateModal from "./UpdateModal";
import CircularNavBarBottom from "../circularNavBar/CircularNavBarBottom";
import { clearMessage } from "../../../redux/slices/message";
import ConfirmationPopUp from "../../../components/confirmationPopUp/ConfirmationPopUp";

const ApartmentDetails = () => {
  const dispatch = useDispatch();
  const [updateModalShow, setUpdateModalShow] = React.useState(false);
  const [updateData, setUpdateData] = React.useState(false);
  const [removeId, setRemoveId] = React.useState(null);
  const [confirmationPopUp, setConfirmationPopUp] = React.useState(false);

  const { apartments, isAdded } = useSelector((state) => state.moderator);
  const { message } = useSelector((state) => state.message);

  const addApartment = (index) => {
    const aData = { indexNo: index };

    dispatch(addNewApartment(aData))
      .unwrap()
      .then(() => {
        toast.success("Successfully Created.");
      })
      .catch(() => toast.error("something went wrong!!"));
  };

  const openUpdateModal = (upData) => {
    setUpdateModalShow(true);
    setUpdateData(upData);
  };

  // Removing pop-up modal
  const handleRemove = (apartment) => {
    if (apartment.status === "unavailable") {
      setConfirmationPopUp(true);
      setRemoveId(null);
    } else {
      setConfirmationPopUp(true);
      setRemoveId(apartment._id);
    }
  };

  useEffect(() => {
    dispatch(allApartments());
    dispatch(clearMessage());
  }, [isAdded, dispatch]);

  const levelAndApartmentCount = (aprtmnts) => {
    const allLevels = aprtmnts.map((item) => item.level);
    let result = Object.values(
      allLevels.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = previousValue[currentValue] || [
          currentValue,
          0,
        ];
        previousValue[currentValue][1]++;
        return previousValue;
      }, {})
    ).map((value) => ({ levels: value[0], apartments: value[1] }));

    return result;
  };

  return (
    <>
      <div className="moderatorWraper">
        <CircularNavBarTop />
        <CircularNavBarBottom />

        <ToastContainer />

        <ConfirmationPopUp
          show={confirmationPopUp}
          onHide={() => setConfirmationPopUp(false)}
          data={removeId}
          popUpType="Remove_Apartment"
        />

        <UpdateModal
          show={updateModalShow}
          onHide={() => setUpdateModalShow(false)}
          data={updateData}
        />

        {message && (
          <div className="form-group text-center">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        {apartments ? (
          levelAndApartmentCount(apartments.floors).map((count, index) => (
            <>
              <div className="text-center container cardBody">
                <h1>{`Floor ${count.levels}`}</h1>
                <h5>{`Apartments ${count.apartments}`}</h5>
                <>
                  <div className="table-responsive">
                    <table class="table align-middle table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Apartement</th>
                          <th scope="col">Room</th>
                          <th scope="col">Rent</th>
                          <th scope="col">Gas</th>
                          <th scope="col">Water</th>
                          <th scope="col">Service Charge</th>
                          <th scope="col">Status</th>
                          <th scope="col">Assigned User</th>
                          <th scope="col">Activity</th>
                        </tr>
                      </thead>

                      {apartments.floors.map((newItem) => {
                        if (newItem.level === count.levels) {
                          return (
                            <>
                              <tbody>
                                <tr>
                                  <td class="table-primary">
                                    {newItem.apartNo}
                                  </td>
                                  <td class="table-secondary">
                                    {newItem.roomNo}
                                  </td>
                                  <td class="table-success">{newItem.rent}</td>
                                  <td class="table-danger">
                                    {newItem.gasbill}
                                  </td>
                                  <td class="table-warning">
                                    {newItem.waterbill}
                                  </td>
                                  <td class="table-info">
                                    {newItem.c_service}
                                  </td>
                                  <td class="table-dark">{newItem.status}</td>
                                  <td class="table-secondary">
                                    {newItem.renterName}
                                  </td>
                                  <td class="table-light">
                                    <button
                                      className="btn btn-primary me-2"
                                      onClick={() => openUpdateModal(newItem)}
                                    >
                                      edit
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleRemove(newItem)}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </table>
                  </div>
                </>

                <button
                  className="btn btn-warning"
                  // onClick={() => console.log(count.levels)}
                  onClick={() => addApartment(count.levels)}
                >
                  Add
                </button>
              </div>
            </>
          ))
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApartmentDetails;
