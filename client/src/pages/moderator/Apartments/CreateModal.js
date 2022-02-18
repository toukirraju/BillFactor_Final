import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createFloors } from "../../../redux/slices/apartmentSlice";

function CreateModal(props) {
  const dispatch = useDispatch();
  const { name, _id } = useSelector((state) => state.auth.user);
  const admnin = {
    name: name,
    adminId: _id,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: admnin });

  const Close = () => {
    setTimeout(function () {
      props.onHide(false);
    }, 5000);
  };

  const onSubmit = (data) => {
    dispatch(createFloors(data))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Successfully Created");
        props.onHide(false);
        // window.location.reload();
      })
      .catch(() => {
        toast.error("Something want wrong");
      });
    // const arr = Array.from({ length: data.numOfFloors }, (_, index) => [
    //   {
    //     floor: index + 1,
    //     apartNo: `A${index + 1}`,
    //     roomNo: `R${index + 1}`,
    //     rent: 0,
    //     gasbill: 0,
    //     waterbill: 0,
    //     c_service: 0,
    //     adminId: 0,
    //   },
    // ]);
    // console.log(arr);

    // reset();
    // toast.success("Successfully Created");
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
            Create Apartment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <section className="">
              <div>
                <ToastContainer closeButton={Close} />
              </div>

              <div className="mx-5 ">
                <div className="row ">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-floating mb-3">
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
                      </div>

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

                      {/* <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="aprtId"
                          autoComplete="off"
                          //value={apartment.aprtId}
                          //onChange={handelInputs}
                          placeholder="aprtId"
                          {...register("aprtId", { required: true })}
                        />
                        <label for="floatingInput">Apartment Id</label>
                        {errors.aprtId && (
                          <span className="text-danger">
                            Apartment Id is required
                          </span>
                        )}
                      </div>

                      <div className="form-floating mb-3">
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
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="roomNo"
                          autoComplete="off"
                          //value={apartment.roomNo}
                          //onChange={handelInputs}
                          placeholder="RoomNo"
                          {...register("roomNo", { required: true })}
                        />
                        <label for="floatingInput">RoomNo</label>
                        {errors.roomNo && (
                          <span className="text-danger">
                            Room No is Required
                          </span>
                        )}
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="rent"
                          autoComplete="off"
                          //value={apartment.rent}
                          //onChange={handelInputs}
                          placeholder="Enter your rent"
                          {...register("rent")}
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
                          //value={apartment.gasbill}
                          //onChange={handelInputs}
                          placeholder="Enter gasbill"
                          {...register("gasbill")}
                        />
                        <label for="floatingInput">Gasbill</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="waterbill"
                          autoComplete="off"
                          //value={apartment.waterbill}
                          //onChange={handelInputs}
                          placeholder="Enter your waterbill"
                          {...register("waterbill")}
                        />
                        <label for="floatingInput">Waterbill</label>
                      </div>

                      <div className="form-floating mb-3">
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
                      </div>

                      <div className="text-center"></div> */}
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

export default CreateModal;
