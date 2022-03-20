import React, { useEffect } from "react";
import "../moderatorPage.css";
import { useDispatch, useSelector } from "react-redux";
import CircularNavBarTop from "../circularNavBar/CircularNavBarTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularNavBarBottom from "../circularNavBar/CircularNavBarBottom";
import { clearMessage } from "../../../redux/slices/message";
import { allrenters } from "../../../redux/slices/renterSlice";
import RenterUpdateModal from "./RenterUpdateModal";
import ConfirmationPopUp from "../../../components/confirmationPopUp/ConfirmationPopUp";

const RenterDetails = () => {
  const dispatch = useDispatch();
  const { data, isAdded } = useSelector((state) => state.renterCreator);
  const { message } = useSelector((state) => state.message);

  const [updateData, setUpdateData] = React.useState(false);
  const [removeId, setRemoveId] = React.useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = React.useState(false);
  const [renterupdateModalShow, setRenterUpdateModalShow] =
    React.useState(false);

  const openUpdateModal = (upData) => {
    setRenterUpdateModalShow(true);
    setUpdateData(upData);
  };

  // Removing pop-up modal
  const handleRemove = (renter) => {
    if (renter.apartNo != "" && renter.roomNo != "") {
      setConfirmationPopUp(true);
      setRemoveId(null);
    } else {
      setConfirmationPopUp(true);
      setRemoveId(renter._id);
    }
  };

  useEffect(() => {
    dispatch(allrenters());
    dispatch(clearMessage());
  }, [isAdded, dispatch]);

  return (
    <>
      <div className="moderatorWraper">
        <CircularNavBarTop />
        <CircularNavBarBottom />

        <ToastContainer />

        <RenterUpdateModal
          show={renterupdateModalShow}
          onHide={() => setRenterUpdateModalShow(false)}
          data={updateData}
        />
        <ConfirmationPopUp
          show={confirmationPopUp}
          onHide={() => setConfirmationPopUp(false)}
          data={removeId}
          pop_up_type="Remove_Renter"
        />

        {message && (
          <div className="form-group text-center">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        {data ? (
          <>
            <div className="container cardBody">
              <h1 className="text-center heading">All Renters</h1>
              <div className="table-responsive ">
                <table class="table align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">National Id</th>
                      <th scope="col">Apartment No</th>
                      <th scope="col">Room No</th>
                      <th scope="col">Advance Rent</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {data.renters.map((renter) => (
                    <tbody>
                      <tr>
                        <td class="table-primary">{renter.renterName}</td>
                        <td class="table-secondary">{renter.phone}</td>
                        <td class="table-success">{renter.address}</td>
                        <td class="table-danger">{renter.nId}</td>
                        <td class="table-warning">{renter.apartNo}</td>
                        <td class="table-info">{renter.roomNo}</td>
                        <td class="table-dark">{renter.advanceRent}</td>

                        <td class="table-light">
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => openUpdateModal(renter)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRemove(renter)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </>
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

export default RenterDetails;
