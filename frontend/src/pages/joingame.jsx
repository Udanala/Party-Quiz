import React from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../components/custombutton';
import { useParams, useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const { sessionId } = useParams();
  const [gameId, setGameId] = React.useState('');
  const [name, setName] = React.useState('');
  const text = sessionId === undefined ? 'Please enter a session ID to join a game:' : sessionId;
  React.useEffect(() => {
    setGameId(sessionId);
  }, [])
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form.Group className='mb-3' style={{ marginTop: '5vh' }}>
      <Form.Label>
        <h3>Please enter a session ID to join a game:</h3>
      </Form.Label>
      <Form.Control onChange={(e) => { setGameId(e.target.value) }} type='text' defaultValue={text} placeholder='Session ID' />
      <br></br>
      <Form.Label>
      <h3>Please enter a name:</h3>
      </Form.Label>
      <Form.Control onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Name' />
      <br></br>
      </Form.Group>
      <CustomButton variant='dark' text='Join' onClick={async () => {
        const response = await fetch(`http://localhost:5005/play/join/${gameId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name
          })
        });
        if (!response.ok) {
          console.log('Error')
        } else {
          const data = await response.json();
          navigate(`/lobby/${gameId}`, { state: { playerId: data.playerId } });
        }
      }}></CustomButton>
    </div>
  );
}

export default JoinGame;
