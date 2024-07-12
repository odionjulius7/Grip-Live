import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal(props) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { handleShow, handleClose, show, title, performAction } = props;

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{title}</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button
            variant="danger"
            onClick={() => {
              performAction();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;

// const CustomModal = (props) => {
//   const { open, hideModal, performAction, title } = props;
//   return (
//     <Modal
//       title="Confirmation"
//       open={open}
//       onOk={performAction}
//       onCancel={hideModal}
//       okText="Ok"
//       cancelText="Cancel"
//     >
//       <p>{title}</p>
//     </Modal>
//   );
// };
