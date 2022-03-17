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
                        <label for="floatingInput">Number of Floor</label>
                        {errors.numOfFloors && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
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

export default CreateModal;
