import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allApartments } from "../../../redux/slices/apartmentSlice";
import { assign } from "../../../redux/slices/assignRenterSlice";
import { allrenters } from "../../../redux/slices/renterSlice";
import { clearMessage } from "../../../redux/slices/message";

function AssignApartment(props) {
  const dispatch = useDispatch();
  const { apartments } = useSelector((state) => state.moderator);
  const { data } = useSelector((state) => state.renterCreator);
  const { isAdded } = useSelector((state) => state.assingRenter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (e) => {
    let apartment = JSON.parse(e.availApartment);

    let renter = JSON.parse(e.availRenter);

    const assignedData = {
      apartmentId: apartment._id,
      apartNo: apartment.apartNo,
      roomNo: apartment.roomNo,
      renterName: renter.renterName,
      renterId: renter._id,
    };

    // console.log(assignedData);
    dispatch(assign(assignedData))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Successfully Created");
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
            Assign Apartment
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
                      {apartments ? (
                        <>
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="floatingSelect"
                              //aria-label="Floating label select example"
                              //onChange={handelInputs}
                              name="availApartment"
                              {...register("availApartment", {
                                required: true,
                              })}
                            >
                              <option selected value="">
                                Select Apartment
                              </option>

                              {apartments.floors.map((option, index) =>
                                option.status === "available" ? (
                                  // value={() => setUpdateApart(option)}
                                  <option
                                    key={index}
                                    value={JSON.stringify(option)}
                                  >
                                    Level: {option.level} &#10148; Apartment No:{" "}
                                    {option.apartNo} &#10148; Room No:{" "}
                                    {option.roomNo}
                                  </option>
                                ) : null
                              )}
                            </select>
                            <label for="floatingSelect">Apartments</label>
                            {errors.availApartment && (
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

                      {data ? (
                        <>
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="floatingSelect"
                              //aria-label="Floating label select example"
                              //onChange={handelInputs}
                              name="availRenter"
                              {...register("availRenter", { required: true })}
                            >
                              <option selected value="">
                                Select Renter
                              </option>

                              {data.renters.map((option, index) =>
                                option.apartNo === "" &&
                                option.roomNo === "" ? (
                                  // value={() => setUpdateApart(option)}
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
                            <label for="floatingSelect">Renters</label>
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

export default AssignApartment;
