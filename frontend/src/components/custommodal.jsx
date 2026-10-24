import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const CustomModal = ({ show, handleClose, message, header, buttonText, fn }) => {
  return (
<Modal role='definition' show={ show } onHide={ handleClose }>
    <Modal.Header closeButton>
      <Modal.Title>{ header }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ message }</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={ handleClose }>
        Close
      </Button>
      <Button data-testid="modalButton" variant="primary" onClick={ fn }>
        {buttonText}
      </Button>
    </Modal.Footer>
  </Modal>);
}

export default CustomModal;
