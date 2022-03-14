import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FormCheck } from "react-bootstrap";
import ConfirmationPopUp from "../../../../components/confirmationPopUp/ConfirmationPopUp";

const CreateTempBillModal = (props) => {
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [confirmData, setConfirmData] = useState({});
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isDetailsSwitchOn, setIsDetailsSwitchOn] = useState(true);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const onDetailsSwitchAction = () => {
    setIsDetailsSwitchOn(!isDetailsSwitchOn);
  };

  const { _id, renterName } = props.renter;

  const [tampBill, setTampBill] = useState({
    renterId: "",
    renterName: "",
    e_bill: 0,
    o_bill: 0,
    tempDue: 0,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTampBill({
      ...tampBill,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // setSubmitedTampBill({
    //   renterId: tampBill.renterId,
    //   renterName: tampBill.renterName,

    //   e_bill: tampBill.e_bill,
    //   o_bill: tampBill.o_bill,
    //   totalRent: tampBill.totalRent,
    //   payableAmount: total,
    //   paidAmount: tampBill.paidAmount,
    //   due: newDue > 0 ? newDue : 0,
    // });
    setConfirmationPopUp(true);

    setConfirmData(tampBill);
    props.onHide(true);
  };

  useEffect(() => {
    setTampBill({
      renterId: _id,
      renterName: renterName,
      e_bill: 0,
      o_bill: 0,
      tempDue: 0,
    });
  }, [props.tempBill]);

  return (
    <>
      <ConfirmationPopUp
        show={confirmationPopUp}
        onHide={() => setConfirmationPopUp(false)}
        data={confirmData}
        popUpType="Create_Temp_Bill"
      />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // className="bg-dark bg-gradient"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Temp </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Switch
              onChange={onDetailsSwitchAction}
              id="custom-switch"
              label="TempBill Details"
              checked={isDetailsSwitchOn}
              // disabled // apply if you want the switch disabled
            />
          </Form>

          {isDetailsSwitchOn ? (
            <>
              <div className="d-flex text-white flex-wrap bg-secondary rounded bg-gradient p-3">
                <p className="me-2">
                  Electricity Bill: <b>{props.tempBill.e_bill}</b>
                </p>
                <p className="me-2">
                  Others Bill: <b>{props.tempBill.o_bill}</b>
                </p>

                <p className="me-2">
                  Old Due: <b>{props.tempBill ? props.tempBill.tempDue : 0}</b>
                </p>
              </div>
            </>
          ) : null}

          <div className=" text-white bg-secondary rounded bg-gradient p-3">
            <Form>
              <Form.Switch
                onChange={onSwitchAction}
                id="custom-switch"
                label="Due Bill "
                checked={isSwitchOn}
                // disabled // apply if you want the switch disabled
              />
            </Form>
            <form onSubmit={submitHandler}>
              {isSwitchOn ? (
                <>
                  <div className="form-group text-warning">
                    <label htmlFor="amount">Due</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Due"
                      name="tempDue"
                      id="tempDue"
                      value={tampBill.tempDue}
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
                <label htmlFor="amount">Electricity Bill</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Electricity Bill"
                  name="e_bill"
                  id="e_bill"
                  value={tampBill.e_bill}
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
                  value={tampBill.o_bill}
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

export default CreateTempBillModal;
