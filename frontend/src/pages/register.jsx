import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Register ({ setShowToast, setToastMsg }) {
  const emailRef = useRef('email');
  const passwordRef = useRef('password');
  const nameRef = useRef('name');
  const nav = useNavigate();

  const registerBtn = () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    async function fetchRegister () {
      try {
        if (name === '' || password === '' || email === '') {
          throw new Error('Please enter all the details');
        } else if (!email.match(emailFormat)) {
          throw new Error('Please enter a valid email address');
        }

        const response = await fetch('http://localhost:5005/admin/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        localStorage.setItem('token', data.token);
        nav('/dashboard');
      } catch (error) {
        setShowToast(true);
        setToastMsg(error.toString());
      }
    }
    fetchRegister();
  }

  return (
    <>
      <Card className='mx-auto' style={{ width: '50%' }}>
        <Card.Title className='mx-auto'>
          Create Account
        </Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control name='name' type='email' placeholder='Enter Name' ref={nameRef}/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control name='email' type='email' placeholder='Enter Email' ref={emailRef}/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type='password' placeholder='Enter Password' ref={passwordRef}/>
            </Form.Group>
          </Form>
          <Button name='register' variant='dark' onClick={registerBtn} style={{ width: '100%' }}>Register</Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>or</div>
          <Button variant='light' onClick={() => { nav('/login') }} style={{ width: '100%' }}>Already have an account? Sign in</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Register;
