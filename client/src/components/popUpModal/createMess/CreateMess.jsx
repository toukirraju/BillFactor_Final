import React from "react";
import { Modal } from "react-bootstrap";

const CreateMess = () => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Mess</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-gradient">
        <div className="row">Input field</div>
      </Modal.Body>
      <Modal.Footer>
        <button>create</button>
      </Modal.Footer>
    </>
  );
};

export default CreateMess;
