import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import UnassignApartment from "../../pages/moderator/AssignRenterToApartment/UnassignApartment";
import { removeLevels } from "../../redux/slices/apartmentSlice";
import { removeRenter } from "../../redux/slices/renterSlice";
import { createBill } from "../../redux/slices/transactionSlice";

const ConfirmationPopUp = (props) => {
  const [unassignApartment, setUnassignApartment] = React.useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (props.popUpType === "Remove_Apartment") {
      dispatch(removeLevels(props.data));
      props.onHide(false);
    } else if (props.popUpType === "Remove_Renter") {
      dispatch(removeRenter(props.data));
      props.onHide(false);
    } else if (props.popUpType === "Create_Bill") {
      dispatch(createBill(props.data));
      props.onHide(false);
    }
  };
  const unAssingned = () => {
    setUnassignApartment(true);
    props.onHide(false);
  };
  // console.log(props.data);
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // className="bg-dark bg-gradient"
      >
        {props.data ? (
          <>
            {props.popUpType === "Remove_Apartment" ||
            props.popUpType === "Remove_Renter" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title> Are you sure? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="alert alert-danger" role="alert">
                    Do you really want to {props.popUpType}? After removing it
                    cannot be undone.
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => props.onHide(false)}
                  >
                    Close
                  </Button>
                  <Button variant="danger" onClick={() => handleConfirm()}>
                    Remove
                  </Button>
                </Modal.Footer>
              </>
            ) : props.popUpType === "Create_Bill" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title> Are you sure? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="alert alert-warning" role="alert">
                    Do you really want to {props.popUpType}? After{" "}
                    {props.popUpType}, it cannot be undone.
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => props.onHide(false)}
                  >
                    Close
                  </Button>
                  <Button variant="warning" onClick={() => handleConfirm()}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure? </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="alert alert-danger" role="alert">
                To remove the {props.popUpType}, it must be unassigned first.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.onHide(false)}>
                Close
              </Button>

              <Button variant="warning" onClick={() => unAssingned()}>
                Unassigned
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <UnassignApartment
        show={unassignApartment}
        onHide={() => setUnassignApartment(false)}
      />
    </>
  );
};

export default ConfirmationPopUp;
