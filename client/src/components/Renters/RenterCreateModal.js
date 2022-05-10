import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { create } from "../../redux/slices/renterSlice";

function RenterCreateModal(props) {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

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
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="renterName"
                          autoComplete="off"
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

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="phone"
                          autoComplete="off"
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
                          placeholder="Enter your Advance Rent"
                          {...register("advanceRent")}
                        />
                        <label for="floatingInput">Advance Rent</label>
                      </div>

                      <button className="btn btn-primary">Submit</button>
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

export default RenterCreateModal;
