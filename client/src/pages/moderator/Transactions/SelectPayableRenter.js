import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allApartments } from "../../../redux/slices/apartmentSlice";
import { allrenters } from "../../../redux/slices/renterSlice";
import { clearMessage } from "../../../redux/slices/message";
import MakeTransactionModal from "./createTransaction/MakeTransactionModal";
import { getTempBill } from "../../../redux/slices/transactionSlice";

function SelectPayableRenter(props) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.renterCreator);
  const { isAdded } = useSelector((state) => state.assingRenter);
  const { apartments } = useSelector((state) => state.moderator);
  const { transactions } = useSelector((state) => state.transaction);

  const [makeTransactionModal, setmakeTransactionModal] = React.useState(false);
  const [apartmentDetail, setapartmentDetail] = React.useState({});
  const [tempData, setTempData] = React.useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (e) => {
    let renter = JSON.parse(e.availRenter);

    let payableApa;
    apartments.floors.map((item) => {
      if (item._id === renter.apartmentId) {
        return (payableApa = item);
      }
    });
    setapartmentDetail(payableApa);
    setmakeTransactionModal(true);
    dispatch(getTempBill(renter._id))
      .then((result) => setTempData(result.payload))
      .catch((err) => console.log(err));
    props.onHide(true);
  };
  useEffect(() => {
    dispatch(allApartments());
    dispatch(allrenters());
    dispatch(clearMessage());
  }, [isAdded, dispatch]);
  return (
    <div>
      <MakeTransactionModal
        show={makeTransactionModal}
        onHide={() => setmakeTransactionModal(false)}
        apartData={apartmentDetail}
        tempBill={tempData}
      />

      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Payable Renters
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

export default SelectPayableRenter;
