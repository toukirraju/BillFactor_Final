import React from "react";
import { Modal } from "react-bootstrap";
import CreateMess from "./createMess/CreateMess";
import CreateRoom from "./createRoom/CreateRoom";

const PopUpModal = (props) => {
  const { createmodal, updatemodal } = props;

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bg-dark bg-gradient"
      >
        {createmodal ? (
          <>
            <CreateMess />
          </>
        ) : updatemodal ? (
          <>
            <CreateRoom />
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default PopUpModal;
