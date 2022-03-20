import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FormCheck } from "react-bootstrap";
import { useSelector } from "react-redux";
import ConfirmationPopUp from "../../../../components/confirmationPopUp/ConfirmationPopUp";

const CreateTransactionModal = (props) => {
  const { isReload } = useSelector((state) => state.dashboardData);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isDetailsSwitchOn, setIsDetailsSwitchOn] = useState(true);
  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const onDetailsSwitchAction = () => {
    setIsDetailsSwitchOn(!isDetailsSwitchOn);
  };

  const {
    renterId,
    renterName,
    rent,
    gasbill,
    f_bill,
    c_service,
    totalRent,
    waterbill,
  } = props.apartData;

  const [transAmount, setTransAmount] = useState({
    renterId: "",
    renterName: "",

    e_bill: 0,
    o_bill: 0,
    totalRent: 0,
    payableAmount: 0,
    paidAmount: 0,
    due: 0,
  });

  const total =
    parseInt(totalRent) +
    parseInt(transAmount.e_bill) +
    parseInt(transAmount.o_bill) +
    parseInt(transAmount.due);

  const newDue = parseInt(total) - parseInt(transAmount.paidAmount);

  const [submitedtransAmount, setSubmitedTransAmount] = useState({
    renterId: transAmount.renterId,
    renterName: transAmount.renterName,

    e_bill: transAmount.e_bill,
    o_bill: transAmount.o_bill,
    totalRent: transAmount.totalRent,
    payableAmount: total,
    paidAmount: transAmount.paidAmount,
    due: newDue > 0 ? newDue : 0,
    date: props.billingDate,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTransAmount({
      ...transAmount,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitedTransAmount({
      renterId: transAmount.renterId,
      renterName: transAmount.renterName,

      e_bill: transAmount.e_bill,
      o_bill: transAmount.o_bill,
      totalRent: transAmount.totalRent,
      payableAmount: total,
      paidAmount: transAmount.paidAmount,
      due: newDue > 0 ? newDue : 0,
      date: props.billingDate,
    });

    setConfirmationPopUp(true);
    props.onHide(true);
  };

  useEffect(() => {
    setTransAmount({
      renterId: renterId,
      renterName: renterName,
      e_bill: props.tempBill.e_bill ? props.tempBill.e_bill : 0,
      o_bill: props.tempBill.o_bill ? props.tempBill.o_bill : 0,
      totalRent: totalRent,
      payableAmount: 0,
      paidAmount: 0,
      due: props.tempBill.tempDue ? props.tempBill.tempDue : 0,
    });
  }, [props.tempBill, isReload]);

  useEffect(() => {
    setTransAmount({
      renterId: "",
      renterName: "",

      e_bill: 0,
      o_bill: 0,
      totalRent: 0,
      payableAmount: 0,
      paidAmount: 0,
      due: 0,
    });
  }, [confirmationPopUp]);

  return (
    <>
      <ConfirmationPopUp
        show={confirmationPopUp}
        onHide={() => setConfirmationPopUp(false)}
        data={submitedtransAmount}
        pop_up_type="Create_Bill"
      />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // className="bg-dark bg-gradient"
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <b>Name: </b>
            {props.apartData.renterName}
          </h5>
          <Form>
            <Form.Switch
              onChange={onDetailsSwitchAction}
              id="custom-switch"
              label="Show Bill Details"
              checked={isDetailsSwitchOn}
              // disabled // apply if you want the switch disabled
            />
          </Form>

          {isDetailsSwitchOn ? (
            <>
              <div className="d-flex text-white flex-wrap bg-secondary rounded bg-gradient p-3">
                <p className="me-2">
                  {" "}
                  Rent: <b>{rent}</b>
                </p>
                <p className="me-2">
                  Gas Bill: <b>{gasbill}</b>
                </p>
                <p className="me-2">
                  Water Bill: <b>{waterbill}</b>
                </p>
                <p className="me-2">
                  Cleaning Service: <b>{c_service}</b>
                </p>
                <p className="me-2">
                  Fridage Bill: <b>{f_bill}</b>
                </p>
                <p className="me-2">
                  Electricity Bill: <b>{props.tempBill.e_bill}</b>
                </p>
                <p className="me-2">
                  Others Bill: <b>{props.tempBill.o_bill}</b>
                </p>
                <p className="me-2">
                  Total Rent: <b>{totalRent}</b>
                </p>
                <p className="me-2">
                  Old Due: <b>{props.tempBill ? props.tempBill.tempDue : 0}</b>
                </p>
              </div>
            </>
          ) : null}

          <div className="d-flex text-white flex-wrap justify-content-around bg-dark rounded bg-gradient p-1 ">
            <p className="mt-2">
              <b>
                Payable Amount: <b className="payableAmount">{total}</b> /-
              </b>
            </p>
            <p className="mt-2">
              <b>
                {newDue < 0
                  ? `Return Money : ${Math.abs(newDue)}`
                  : `Due : ${newDue}`}
              </b>
            </p>
          </div>
          <div className=" text-white bg-secondary rounded bg-gradient p-3">
            <Form>
              <Form.Switch
                onChange={onSwitchAction}
                id="custom-switch"
                label="Add Manual Bill "
                checked={isSwitchOn}
                // disabled // apply if you want the switch disabled
              />
            </Form>
            <form onSubmit={submitHandler}>
              {isSwitchOn ? (
                <>
                  <div className="form-group text-warning">
                    <label htmlFor="amount">Electricity Bill</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Electricity Bill"
                      name="e_bill"
                      id="e_bill"
                      value={transAmount.e_bill}
                      onFocus={(e) => (e.target.value = "")}
                      onChange={changeHandler}
                      required
                    />
                  </div>

                  <div className="form-group text-warning">
                    <label htmlFor="amount">Others Bill</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Others Bill"
                      name="o_bill"
                      id="o_bill"
                      value={transAmount.o_bill}
                      onFocus={(e) => (e.target.value = "")}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="form-group text-warning">
                <label htmlFor="amount">Paid Amount</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Paid Amount"
                  name="paidAmount"
                  id="paidAmount"
                  value={transAmount.paidAmount}
                  onFocus={(e) => (e.target.value = "")}
                  onChange={changeHandler}
                  required
                />
              </div>

              <button className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateTransactionModal;
