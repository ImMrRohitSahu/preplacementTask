import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SuccessModal from "../SuccessModal/SuccessModal";
import { AuthContext } from "../../contexts/AuthContext";

// eslint-disable-next-line react/prop-types
const SignUpModal = ({ setShowSignUpModal, showSignUpModal }) => {
    const [show, setShow] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const {setLoginPage} = useContext(AuthContext)

  const clearInput=()=>{
    setName("")
    setEmail("")
    setPassword("")
    setConfPassword("")
  }

  const handleClose = () => {
    clearInput()
    setShowSignUpModal(false);
  };

  const submitHandler = () => {
    const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordREGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name.length < 2 || name.length > 20) {
      setError("Please Enter Valid Name!!!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    if (!emailREGEX.test(email)) {
      setError("Please Enter Valid Email!!!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    if (!passwordREGEX.test(password)) {
      setError("Please Enter Valid Password Format!!!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    if (password !== confPassword) {
      setError("Both Password Does Not Match!!!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    //getting data
    const existingUserDataString = localStorage.getItem("preplaceUser");
    const existingUserData = existingUserDataString
      ? JSON.parse(existingUserDataString)
      : [];

    // saving the data
    const saveData = {
        name,
        email,
        password
    }
    const updatedUserData = [...existingUserData, saveData];
    localStorage.setItem("preplaceUser", JSON.stringify(updatedUserData))
    
    setShowSignUpModal(false);
    setShow(true)
    setTimeout(() => {
        setShow(false)
        setLoginPage(true)
    }, 4000);
  };

  return (
    <>
      <Modal show={showSignUpModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center input-group">
            <div className="input">
              <input
                type="text"
                autoFocus
                placeholder="Enter Your Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Create Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Re-Enter Password"
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="text-center">
            <span className="text-danger">{error}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Register Now
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessModal setShow={setShow} show={show} name={name} />
    </>
  );
};

export default SignUpModal;
