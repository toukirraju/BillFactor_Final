import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { update } from "../../redux/slices/apartmentSlice";

function UpdateModal(props) {
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    _id: 0,
    apartNo: "",
    roomNo: "",
    rent: 0,
    gasbill: 0,
    waterbill: 0,
    c_service: 0,
    f_bill: 0,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(update(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Successfully Created");
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
        apartNo: props.data.apartNo,
        roomNo: props.data.roomNo,
        rent: props.data.rent,
        gasbill: props.data.gasbill,
        waterbill: props.data.waterbill,
        c_service: props.data.c_service,
        f_bill: props.data.f_bill,
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

        <Modal.Body>
          <div>
            <section className="">
              <div className="mx-5 ">
                <div className="row ">
                  <div className="col-md-12">
                    <form onSubmit={onSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="apartNo"
                          autoComplete="off"
                          value={updatedData.apartNo}
                          onChange={changeHandler}
                          required
                          placeholder="Apartment Id"
                        />
                        <label for="floatingInput">Apartment Id</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="roomNo"
                          autoComplete="off"
                          value={updatedData.roomNo}
                          onChange={changeHandler}
                          required
                          placeholder="RoomNo"
                        />
                        <label for="floatingInput">RoomNo</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="rent"
                          autoComplete="off"
                          value={updatedData.rent}
                          onChange={changeHandler}
                          required
                          placeholder="Enter your rent"
                        />
                        <label for="floatingInput">Rent</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="gasbill"
                          autoComplete="off"
                          value={updatedData.gasbill}
                          onChange={changeHandler}
                          required
                          placeholder="Enter gasbill"
                        />
                        <label for="floatingInput">Gas bill</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="waterbill"
                          autoComplete="off"
                          value={updatedData.waterbill}
                          onChange={changeHandler}
                          required
                          placeholder="Enter your waterbill"
                        />
                        <label for="floatingInput">Water bill</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="f_bill"
                          autoComplete="off"
                          value={updatedData.f_bill}
                          onChange={changeHandler}
                          required
                          placeholder="Enter Fridge bill"
                        />
                        <label for="floatingInput">Fridge bill</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="c_service"
                          autoComplete="off"
                          value={updatedData.c_service}
                          onChange={changeHandler}
                          required
                          placeholder="Enter service charge"
                        />
                        <label for="floatingInput">Service charge</label>
                      </div>

                      <button className="btn btn-primary m-1">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateModal;
