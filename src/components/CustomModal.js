import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ show, setShow, title, body, footer }) => {
  const toggleShow = () => setShow(!show);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={toggleShow}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
