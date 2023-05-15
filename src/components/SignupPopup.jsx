import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignupPopup = (props) => {
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }
  
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const user = { username, surname, email, password };
    axios.post('http://localhost:3000/users', user)
      .then((response) => {
        })
      .catch((error) => {
        alert('Error', error.message);
      });
    props.onClose();
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={username} onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname:</Form.Label>
            <Form.Control type="text" value={surname} onChange={handleSurnameChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" value={email} onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Sign-up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupPopup;