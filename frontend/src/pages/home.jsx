import React from 'react';
import CustomButton from '../components/custombutton'
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home () {
  const nav = useNavigate();
  return (
    <div>
      <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} gap={2} className="col-md-5 mx-auto">
        <h1>Welcome to BigBrain</h1>
        <CustomButton name='goto-register' width='25vw' variant='outline-dark' onClick={() => { nav('/register') }} text='Create Account'></CustomButton>
        <CustomButton name='goto-login' width='25vw' variant='outline-dark' onClick={() => { nav('/login') }} text='Sign in'></CustomButton>
      </Stack>
    </div>
  );
}

export default Home;
