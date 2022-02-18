import React from "react";
import { Modal, Button } from "react-bootstrap";

const CreateRoom = () => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-gradient">
        <div className="row">Input field</div>
      </Modal.Body>
      <Modal.Footer>
        <Button>create</Button>
      </Modal.Footer>
    </>
  );
};

export default CreateRoom;
