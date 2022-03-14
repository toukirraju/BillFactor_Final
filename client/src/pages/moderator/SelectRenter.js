import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getProfileDetails } from "../../redux/slices/publicDataSlice";
import RenterProfileModal from "../../components/renterProfile/RenterProfileModal";

function SelectRenter(props) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.renterCreator);

  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [renterDetails, setRenterDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const showProfileModal = () => {
    setOpenProfileModal(true);
    setLoading(false);
  };
  const onSubmit = (e) => {
    let renter = JSON.parse(e.renterData);
    setLoading(true);
    dispatch(getProfileDetails(renter._id))
      .unwrap()
      .then((result) => {
        setRenterDetails(result);
        setLoading(false);
      })
      .catch((err) => setLoading(false))
      .finally(() => showProfileModal());
    // props.onHide(true);
  };

  return (
    <div>
      <RenterProfileModal
        show={openProfileModal}
        onHide={() => setOpenProfileModal(false)}
        renterData={renterDetails}
      />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Find</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Select  User */}
          <div className="mx-5">
            <div className="row ">
              <div className="col-md-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {data ? (
                    <>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          name="renterData"
                          {...register("renterData", { required: true })}
                        >
                          <option selected value="">
                            Select Renter
                          </option>

                          {data.renters.map((option, index) => (
                            <option key={index} value={JSON.stringify(option)}>
                              &#128100; {option.renterName} &#x27AA; &#x27AA;
                              &#128222; {option.phone}
                            </option>
                          ))}
                        </select>
                        <label for="floatingSelect">Renters</label>
                        {errors.renterData && (
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
                </form>

                <div className="d-flex justify-content-around">
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SelectRenter;
