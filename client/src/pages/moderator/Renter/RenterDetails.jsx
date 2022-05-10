import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "../moderatorPage.css";

import RenterUpdateModal from "../../../components/Renters/RenterUpdateModal";
import ConfirmationPopUp from "../../../components/confirmationPopUp/ConfirmationPopUp";

import { clearMessage } from "../../../redux/slices/message";
import { allrenters } from "../../../redux/slices/renterSlice";
import AssignApartment from "../../../components/AssignRenterToApartment/AssignApartment";
import UnassignApartment from "../../../components/AssignRenterToApartment/UnassignApartment";

const RenterDetails = () => {
  const dispatch = useDispatch();

  const { data, isAdded } = useSelector((state) => state.renterCreator);
  const { message } = useSelector((state) => state.message);

  const [updateData, setUpdateData] = React.useState(false);
  const [removeId, setRemoveId] = React.useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = React.useState(false);
  const [renterupdateModalShow, setRenterUpdateModalShow] =
    React.useState(false);

  const [assignApartment, setAssignApartment] = React.useState(false);

  const [unassignApartment, setUnassignApartment] = React.useState(false);

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
        <AssignApartment
          show={assignApartment}
          onHide={() => setAssignApartment(false)}
        />
        <UnassignApartment
          show={unassignApartment}
          onHide={() => setUnassignApartment(false)}
        />
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
            <div className="d-flex justify-content-center">
              <button
                className="d-flex btn btn-outline-success m-2"
                onClick={() => setAssignApartment(true)}
              >
                <i className="fas fa-inbox-in"></i>
                <span className="nav-text">Assign Renter</span>
              </button>

              <button
                className="d-flex btn btn-outline-warning m-2"
                onClick={() => setUnassignApartment(true)}
              >
                <i className="fas fa-inbox-out"></i>
                <span className="nav-text">UnAssign Renter</span>
              </button>
            </div>

            <div className="container cardBody">
              <h1 className="text-center heading">All Renters</h1>
              <div className="table-responsive ">
                <table className="table align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="text-white">
                        Serial
                      </th>
                      <th scope="col" className="text-white">
                        Name
                      </th>
                      <th scope="col" className="text-white">
                        Phone
                      </th>
                      <th scope="col" className="text-white">
                        Address
                      </th>
                      <th scope="col" className="text-white">
                        National Id
                      </th>
                      <th scope="col" className="text-white">
                        Apartment No
                      </th>
                      <th scope="col" className="text-white">
                        Room No
                      </th>
                      <th scope="col" className="text-white">
                        Advance Rent
                      </th>
                      <th scope="col" className="text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {data.renters.map((renter, index) => (
                    <tbody key={uuidv4()}>
                      <tr>
                        <td className="table-danger">{index + 1}</td>
                        <td className="table-primary">{renter.renterName}</td>
                        <td className="table-secondary">{renter.phone}</td>
                        <td className="table-success">{renter.address}</td>
                        <td className="table-danger">{renter.nId}</td>
                        <td className="table-warning">{renter.apartNo}</td>
                        <td className="table-info">{renter.roomNo}</td>
                        <td className="table-dark">{renter.advanceRent}</td>

                        <td className="table-light">
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
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RenterDetails;
