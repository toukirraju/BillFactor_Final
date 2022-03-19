import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import {
  getTempBill,
  getPayableRenters,
} from "../../../redux/slices/transactionSlice";

import CreateTransactionModal from "./createTransaction/CreateTransactionModal";
import CreateTempBillModal from "./createTransaction/CreateTempBillModal";

function SelectPayableRenter(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.renterCreator);
  const { apartments } = useSelector((state) => state.moderator);
  const { payableRenters, isPending } = useSelector(
    (state) => state.transaction
  );

  const [createTampModal, setCreateTampModal] = React.useState(false);
  const [createTransactionModal, setCreateTransactionModal] =
    React.useState(false);

  const [apartmentDetail, setApartmentDetail] = React.useState({});
  const [tempData, setTempData] = React.useState({});
  const [renterData, setRenterData] = React.useState({});

  const [startDate, setStartDate] = React.useState(new Date());
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const [showSelectOpt, setShowSelectOpt] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const srcMonthlyBill = () => {
    dispatch(getPayableRenters({ month, year }))
      .unwrap()
      .then(() => setShowSelectOpt(true))
      .catch(() => setShowSelectOpt(false));
  };
  const onChangeDatePicker = (date) => {
    setStartDate(date);
    setShowSelectOpt(false);
  };

  // make bill model
  const onSubmitBillPay = (e) => {
    let renter = JSON.parse(e.availRenter);

    let payableApa;
    apartments.floors.map((item) => {
      if (item._id === renter.apartmentId) {
        return (payableApa = item);
      }
    });
    setApartmentDetail(payableApa);

    dispatch(getTempBill(renter._id))
      .then((result) => {
        setTempData(result.payload);
        setCreateTransactionModal(true);
      })
      .catch((err) => console.log(err));
    props.onHide(true);
    setShowSelectOpt(false);
  };

  // make Temporary bill model
  const openTemporaryBill = (e) => {
    let renter = JSON.parse(e.availRenter);

    dispatch(getTempBill(renter._id))
      .then((result) => {
        setTempData(result.payload);
        setCreateTampModal(true);
      })
      .catch((err) => console.log(err));

    setRenterData(renter);
  };

  useEffect(() => {
    reset({
      availRenter: "",
    });
  }, [showSelectOpt]);

  return (
    <div>
      <CreateTransactionModal
        show={createTransactionModal}
        onHide={() => setCreateTransactionModal(false)}
        apartData={apartmentDetail}
        tempBill={tempData}
        billingDate={startDate}
      />

      <CreateTempBillModal
        show={createTampModal}
        onHide={() => setCreateTampModal(false)}
        renter={renterData}
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
            Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Date Picker */}
          <div className="input-container">
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => onChangeDatePicker(date)}
                maxDate={new Date()}
                // minDate={
                //   user.role !== undefined || user.role !== ""
                //     ? new Date()
                //     : false
                // }
                dateFormat="MMMM d, yyyy"
                // showMonthYearPicker
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                withPortal
              />
            </div>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => srcMonthlyBill()}
              >
                &#x1F50E;
              </button>
            </div>
          </div>

          {/* Loading Spinner */}
          {isPending ? (
            <>
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          ) : null}

          {/* Select Unpain User */}
          <div className={!showSelectOpt ? `d-none` : `mx-5`}>
            <div className="row ">
              <div className="col-md-12">
                <form onSubmit={handleSubmit(onSubmitBillPay)}>
                  {data ? (
                    <>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          name="availRenter"
                          {...register("availRenter", { required: true })}
                          // onChange={(e) => (e.target.value = "availRenter")}
                        >
                          <option selected value="">
                            Select Renter
                          </option>
                          {/* unPaidRenters(transactionCompletedUser, data) */}
                          {payableRenters.map((option, index) =>
                            option.apartNo !== "" && option.roomNo !== "" ? (
                              <option
                                key={index}
                                value={JSON.stringify(option)}
                              >
                                &#128100; {option.renterName} &#x27AA; &#x27AA;
                                &#128222; {option.phone}
                              </option>
                            ) : null
                          )}
                        </select>
                        <label for="floatingSelect">Payable Renters</label>
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
                </form>

                {user.role === undefined || user.role === "" ? (
                  <>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleSubmit(openTemporaryBill)}
                      >
                        Temporary Bill
                      </button>

                      <button
                        className="btn btn-outline-warning"
                        onClick={handleSubmit(onSubmitBillPay)}
                      >
                        BillPay
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <button
                      className="btn btn-outline-warning"
                      onClick={handleSubmit(onSubmitBillPay)}
                    >
                      BillPay
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SelectPayableRenter;
