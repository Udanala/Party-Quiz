import { React, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
// import fetchApi from '../components/helper';

function Login () {
  const emailRef = useRef('email');
  const passwordRef = useRef('password');
  const nav = useNavigate();

  const loginBtn = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    async function fetchLogin () {
      try {
        if (password === '' || email === '') {
          throw new Error('Please enter all the details');
        } else if (!email.match(emailFormat)) {
          throw new Error('Please enter a valid email address');
        }
        // const data = await fetchApi('http://localhost:5005/admin/auth/login', 'POST', null, { email, password })
        // console.log('login', data)
        const response = await fetch('http://localhost:5005/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
        alert(error);
      }
    }

    fetchLogin();
  }

  return (
    <>
      <Card className='mx-auto' style={{ width: '50%' }}>
        <Card.Title className='mx-auto'>
          Sign in
        </Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control name='email' type='email' placeholder='Enter Email' ref={emailRef}/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type='password' placeholder='Enter Password' ref={passwordRef}/>
            </Form.Group>
          </Form>
          <Button name='login' variant='dark' onClick={loginBtn} style={{ width: '100%' }}>Login</Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>or</div>
          <Button name='login-button' variant='light' onClick={() => { nav('/register') }} style={{ width: '100%' }}>New to Bigbrain? Join now</Button>
        </Card.Body>
      </Card>
    </>

  );
}

export default Login;
