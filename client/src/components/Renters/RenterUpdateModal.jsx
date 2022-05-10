import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { update } from "../../redux/slices/renterSlice";

function RenterUpdateModal(props) {
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    _id: 0,
    renterName: "",
    address: "",
    phone: "",
    nId: "",
    advanceRent: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(update(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Successfully updated");
        // window.location.reload();

        props.onHide(false);
      })
      .catch(() => {
        toast.error("Something want wrong");
      });
  };

  useEffect(() => {
    setTimeout(function () {
      setUpdatedData({
        _id: props.data._id,
        renterName: props.data.renterName,
        address: props.data.address,
        phone: props.data.phone,
        nId: props.data.nId,
        advanceRent: props.data.advanceRent,
      });
    }, 1000);
  }, [props]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update</Modal.Title>
        </Modal.Header>

        <>
          <Modal.Body>
            <div className="mx-5 ">
              <div className="row ">
                <div className="col-md-12">
                  <form onSubmit={onSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="renterName"
                        autoComplete="off"
                        value={updatedData.renterName}
                        onChange={changeHandler}
                        placeholder="Renter Name"
                        required
                      />
                      <label for="floatingInput">Renter Name</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="address"
                        autoComplete="off"
                        value={updatedData.address}
                        onChange={changeHandler}
                        placeholder="Address"
                      />
                      <label for="floatingInput">Address</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="phone"
                        autoComplete="off"
                        value={updatedData.phone}
                        onChange={changeHandler}
                        placeholder="Enter your Phone"
                        required
                      />
                      <label for="floatingInput">Phone</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="nId"
                        autoComplete="off"
                        value={updatedData.nId}
                        onChange={changeHandler}
                        placeholder="Enter NId"
                      />
                      <label for="floatingInput">N_Id</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="advanceRent"
                        autoComplete="off"
                        value={updatedData.advanceRent}
                        onChange={changeHandler}
                        placeholder="Enter your Advance Rent"
                      />
                      <label for="floatingInput">Advance Rent</label>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </>
      </Modal>
    </div>
  );
}

export default RenterUpdateModal;
