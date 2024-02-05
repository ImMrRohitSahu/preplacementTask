import { Button, Modal } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const SuccessModal = ({setShow, show, name}) => {
    const handleClose = () =>{
        setShow(false)
    }
  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello, {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-success">Woohoo, you have successfully created your account...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SuccessModal