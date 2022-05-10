import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allApartments } from "../../redux/slices/apartmentSlice";
import { unAssign } from "../../redux/slices/assignRenterSlice";
import { allrenters } from "../../redux/slices/renterSlice";
import { clearMessage } from "../../redux/slices/message";

function UnassignApartment(props) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.renterCreator);
  const { isAdded } = useSelector((state) => state.assingRenter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (e) => {
    let renter = JSON.parse(e.availRenter);

    const unAssignedData = {
      apartmentId: renter.apartmentId,
      renterId: renter._id,
    };

    // console.log(unAssignedData);
    dispatch(unAssign(unAssignedData))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Successfully Unassigned");
        dispatch(allApartments());
        dispatch(allrenters());
        props.onHide(false);
        // window.location.reload();
      })
      .catch(() => {
        toast.error("Something want wrong");
      });
  };
  // useEffect(() => {
  //   dispatch(allApartments());
  //   dispatch(allrenters());
  //   dispatch(clearMessage());
  // }, [isAdded, dispatch]);
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
            Unassign Apartment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <section className="">
              <div>
                <ToastContainer />
              </div>

              <div className="mx-5 ">
                <div className="row ">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {data ? (
                        <>
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="floatingSelect"
                              name="availRenter"
                              {...register("availRenter", { required: true })}
                            >
                              <option selected value="">
                                Select Renter
                              </option>

                              {data.renters.map((option, index) =>
                                option.apartNo !== "" &&
                                option.roomNo !== "" ? (
                                  <option
                                    key={index}
                                    value={JSON.stringify(option)}
                                  >
                                    Name: {option.renterName} &#10148; Phone:{" "}
                                    {option.phone}
                                  </option>
                                ) : null
                              )}
                            </select>
                            <label for="floatingSelect">Assigned Renters</label>
                            {errors.availRenter && (
                              <span className="text-danger d-block">
                                This field is required
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <h2>wait....</h2>
                        </>
                      )}

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

export default UnassignApartment;
