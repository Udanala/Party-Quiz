import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar () {
  const nav = useNavigate();
  const LoginCheck = () => {
    if (localStorage.getItem('token') === null) {
      return (
        <>
          <Nav>
            <Nav.Link onClick={() => { nav('/login') }}>Login</Nav.Link>
          </Nav>
        </>
      );
    } else {
      const removeToken = () => {
        localStorage.removeItem('token');
        nav('/login')
      }
      return (
        <>
          <Nav>
            <Nav.Link onClick={removeToken}>Logout</Nav.Link>
          </Nav>
        </>
      );
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => { nav('/') }}>BigBrain</Navbar.Brand>
          <Nav className="me-auto">
            {
              localStorage.getItem('token') !== null &&
              <>
                <Nav.Link onClick={() => { nav('/dashboard') }}>Dashboard</Nav.Link>
                <Nav.Link onClick={() => { nav('/join') }}>Join a game</Nav.Link>
              </>
}
          </Nav>
          <LoginCheck />
        </Container>
      </Navbar>
      <br />
    </>

  );
}

export default NavBar;
