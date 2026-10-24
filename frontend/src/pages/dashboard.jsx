import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '../components/custombutton';
import { Card, Stack, Form, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/custommodal';
// import fetchApi from '../components/helper';

function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);

  function GameCard ({ title, id, tn }) {
    const [data, setData] = React.useState('');
    const [modalNum, setModalNum] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    const [modalMessage, setModalMessage] = React.useState('');
    const [started, setStarted] = React.useState(false);
    const [sessionId, setSessionId] = React.useState('');
    const nav = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = () => {
      nav(`/admin/${sessionId}`, { state: { quizId: id } });
    }

    const deleteQuiz = async (quizId) => {
      try {
        const newList = quizzes.filter(quiz => quiz.id !== quizId);
        setQuizzes(newList);
        const response = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = response.json();
        if (!response.ok) {
          throw new Error(data.error)
        }
      } catch (error) {
        alert(error);
      }
    }

    const [questionNum, setQuestionNum] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    async function fetchQuestion () {
      try {
        const response = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        if (data.questions !== undefined) setQuestionNum(data.questions.length);

        let time = 0;
        for (const question of data.questions) {
          time += parseInt(question.timeLimit);
        }
        setTotalTime(time);
      } catch (error) {
        alert(error)
      }
    }
    useEffect(fetchQuestion, []);
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>{ title }</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              <Stack direction='horizontal' gap={3}>
                <span>{questionNum} questions</span>
                <span> {totalTime} seconds</span>
              </Stack>
            </Card.Subtitle>
            <Card.Img src={tn} thumbnail='true'></Card.Img>
            <br /><br />
            <Stack direction='horizontal' gap={3}>
              <span><CustomButton onClick={() => nav(`/dashboard/editquiz/${id}`)} variant='dark' text='Edit Quiz'></CustomButton></span>
              <span><CustomButton onClick={() => { deleteQuiz(id) }} variant='dark' text='Delete Quiz'></CustomButton></span>
              <CustomButton onClick={ async () => {
                localStorage.setItem(id, true);
                setStarted(!started);
                setModalNum(1);
                setButtonText('Copy')
                handleShow();
                const responseStart = await fetch(`http://localhost:5005/admin/quiz/${id}/start`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                });
                if (!responseStart.ok) {
                  console.log('Error');
                }
                const responseID = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                });
                if (!responseID.ok) {
                  console.log('Error')
                }
                const data = await responseID.json();
                setSessionId(data.active);
                setModalMessage(`Session ID: ${data.active}`);
                setData(data.active);
              }} variant='dark' disabled={ localStorage.getItem(id) === 'true' } text='Start Quiz'></CustomButton>
              <CustomButton onClick={ async () => {
                localStorage.setItem(id, 'false');
                const response = await fetch(`http://localhost:5005/admin/quiz/${id}/end`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  },
                });
                if (!response.ok) {
                  window.alert('error');
                }
                setModalNum(2);
                setStarted(false);
                setButtonText('Yes')
                setModalMessage('Would you like to view the results?')
                handleShow();
              }} variant='dark' disabled={ localStorage.getItem(id) === 'false' } text='Stop Quiz'></CustomButton>
              <CustomButton text='Go to Quiz Control Page' variant='dark' onClick={ navigate }></CustomButton>
            </Stack>
          </Card.Body>
        </Card>
        {modalNum === 1 &&
          <CustomModal show={ show } handleClose={ handleClose } fn={() => { navigator.clipboard.writeText(`http://localhost:3000/join/${data}`) }} message={ modalMessage } header='BigBrain Quiz' buttonText={ buttonText } />
        }
        {modalNum === 2 &&
          <CustomModal show={ show } handleClose={ handleClose } fn={ navigate } message={ modalMessage } header='BigBrain Quiz' buttonText={ buttonText } />
        }
      </>
    );
  }

  function CreateGameCard () {
    const nameRef = useRef('name');
    async function createGame () {
      try {
        const name = nameRef.current.value;
        const response = await fetch('http://localhost:5005/admin/quiz/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        await fetchQuizzes();
      } catch (error) {
        alert(error)
      }
    }
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Create A New Game</Card.Title>
            <Form.Group className='mb-3'>
              <Form.Label>Game Title</Form.Label>
              <Form.Control name='new-game-title' type='text' placeholder='Enter game name' ref={nameRef} />
            </Form.Group>
            <CustomButton name='create-game' variant='dark' onClick={createGame} text='Create'></CustomButton>
          </Card.Body>
        </Card>
      </>
    );
  }

  async function fetchQuizzes () {
    // const data = await fetchApi('http://localhost:5005/admin/quiz', 'GET', localStorage.getItem('token'), null)
    const res = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    const data = await res.json();
    console.log('quizzes', data);
    setQuizzes(data.quizzes);
  }

  useEffect(fetchQuizzes, [])

  return (
    <>
      <h1>Dashboard</h1>
      <CreateGameCard />
      {quizzes.map(quiz => (
        <div key={quiz.id}>
          <GameCard
            id={ quiz.id }
            title={ quiz.name }
            tn={quiz.thumbnail}
           />
        </div>
      ))}
    </>
  );
}

export default Dashboard;
