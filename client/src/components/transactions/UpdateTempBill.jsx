import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { updateTemp } from "../../redux/slices/transactionSlice";

function UpdateTempBill(props) {
  const dispatch = useDispatch();
  const [updatedTempData, setUpdatedTempData] = useState({
    _id: "",
    e_bill: 0,
    o_bill: 0,
    tempDue: 0,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTemp(updatedTempData))
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
      setUpdatedTempData({
        _id: props.data._id,
        e_bill: props.data.e_bill,
        o_bill: props.data.o_bill,
        tempDue: props.data.tempDue,
      });
    }, 1000);
  }, [props]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedTempData({
      ...updatedTempData,
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
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="e_bill"
                        autoComplete="off"
                        value={updatedTempData.e_bill}
                        onChange={changeHandler}
                        placeholder="Electricity Bill"
                        required
                      />
                      <label for="floatingInput">Electricity Bill</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="o_bill"
                        autoComplete="off"
                        value={updatedTempData.o_bill}
                        onChange={changeHandler}
                        placeholder="Others Bill"
                      />
                      <label for="floatingInput">Others Bill</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="tempDue"
                        autoComplete="off"
                        value={updatedTempData.tempDue}
                        onChange={changeHandler}
                        placeholder="Due"
                        required
                      />
                      <label for="floatingInput">Due</label>
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

export default UpdateTempBill;
