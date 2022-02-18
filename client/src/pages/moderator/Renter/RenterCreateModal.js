import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create } from "../../../redux/slices/renterSlice";

function RenterCreateModal(props) {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  // const { name, _id } = useSelector((state) => state.auth.user);
  // const admnin = {
  //   name: name,
  //   adminId: _id,
  // };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const Close = () => {
    setTimeout(function () {
      props.onHide(false);
    }, 5000);
  };

  const onSubmit = (data) => {
    dispatch(create(data))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Successfully Created");
        props.onHide(false);
        // window.location.reload();
      })
      .catch(() => toast.error("something went wrong!!"));
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
          <Modal.Title id="contained-modal-title-vcenter">
            Create Renter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <section className="">
              <div>
                <ToastContainer />
              </div>

              {message && (
                <div className="form-group text-center">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <div className="mx-5 ">
                <div className="row ">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          name="numOfFloors"
                          autoComplete="off"
                          placeholder="numOfFloors"
                          {...register("numOfFloors", { required: true })}
                        />
                        <label for="floatingInput">Number Of Floor</label>
                        {errors.numOfFloors && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div> */}

                      {/* <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          name="numOfApart"
                          autoComplete="off"
                          placeholder="numOfApart"
                          {...register("numOfApart", { required: true })}
                        />
                        <label for="floatingInput">Numbers of Apartment</label>
                        {errors.numOfApart && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div> */}

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="renterName"
                          autoComplete="off"
                          //value={apartment.renterName}
                          //onChange={handelInputs}
                          placeholder="renterName"
                          {...register("renterName", { required: true })}
                        />
                        <label for="floatingInput">Name</label>
                        {errors.renterName && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>

                      {/* <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          //aria-label="Floating label select example"
                          //onChange={handelInputs}
                          name="aprtStatus"
                          {...register("aprtStatus", { required: true })}
                        >
                          <option selected value="">
                            Select Apartment Status
                          </option>
                          <option value="Occupied">Occupied</option>
                          <option value="Not Occupied">Not Occupied</option>
                        </select>
                        <label for="floatingSelect">Apartment Status</label>
                        {errors.aprtStatus && (
                          <span className="text-danger d-block">
                            Apartment Status is required
                          </span>
                        )}
                      </div> */}

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="phone"
                          autoComplete="off"
                          //value={apartment.phone}
                          //onChange={handelInputs}
                          placeholder="phone"
                          {...register("phone", { required: true })}
                        />
                        <label for="floatingInput">Phone</label>
                        {errors.phone && (
                          <span className="text-danger">
                            This field is Required
                          </span>
                        )}
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="address"
                          autoComplete="off"
                          //value={apartment.address}
                          //onChange={handelInputs}
                          placeholder="Enter your address"
                          {...register("address")}
                        />
                        <label for="floatingInput">Address</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="nId"
                          autoComplete="off"
                          //value={apartment.nId}
                          //onChange={handelInputs}
                          placeholder="Enter NId"
                          {...register("nId")}
                        />
                        <label for="floatingInput">N-Id</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="advanceRent"
                          autoComplete="off"
                          //value={apartment.advanceRent}
                          //onChange={handelInputs}
                          placeholder="Enter your Advance Rent"
                          {...register("advanceRent")}
                        />
                        <label for="floatingInput">Advance Rent</label>
                      </div>

                      {/* <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="c_service"
                          autoComplete="off"
                          //value={apartment.c_service}
                          //onChange={handelInputs}
                          placeholder="Enter c_service"
                          {...register("c_service")}
                        />
                        <label for="floatingInput">c_service</label>
                      </div> */}

                      <button className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Modal.Body>
        {/* 
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Create
          </button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default RenterCreateModal;
