import React from 'react';
import { useInterval } from '../useInterval';
// import CustomButton from './custombutton';
import { Form, Row, Col } from 'react-bootstrap';

const QuizQuestion = ({ playerId, timeLimit, question, points, answers, questionType, questionId, timeDate }) => {
  const [timeLeft, setTimeLeft] = React.useState(timeLimit - 1);
  const [answerList, setAnswerList] = React.useState([]);
  const [displayAnswer, setDisplayAnswer] = React.useState(false);
  const [type, setType] = React.useState('');
  const [playerAnswerList, setPlayerAnswerList] = React.useState([]);
  React.useEffect(() => {
    setPlayerAnswerList([]);
    // Calculate when question is due
    // const t = new Date(timeDate);
    // t.setSeconds(t.getSeconds() + Number(timeLimit))
    // // Calculate how long from when question is due to now
    // const time = t.getTime() - new Date().getTime();
    // setTimeLeft(Math.ceil(time / 1000));
    setTimeLeft(timeLimit);
    if (questionType === 'Single') setType('radio');
    else setType('checkbox');
  }, [questionId])

  React.useEffect(() => {
    if (playerAnswerList.length > 0) {
      submitAnswers();
    }
  }, [playerAnswerList])

  const addToAnswerList = (answer, index) => {
    setPlayerAnswerList([...playerAnswerList, [answer, index]])
  };

  const removeFromAnswerList = (index) => {
    setPlayerAnswerList(playerAnswerList.filter(item => item[1] !== index));
  };

  const submitAnswers = () => {
    const answerList = [];
    playerAnswerList.forEach(item => answerList.push(item[0]));
    fetch(`http://localhost:5005/play/${playerId}/answer`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        answerIds: answerList
      })
    })
  }

  const getAnswer = async (playerId) => {
    const response = await fetch(`http://localhost:5005/play/${playerId}/answer`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    setAnswerList(data.answerIds);
    setDisplayAnswer(true);
  }

  React.useEffect(async () => {
    if (!timeLeft) {
      getAnswer(playerId);
    }
  }, [timeLeft, playerId]);

  useInterval(
    React.useCallback(() => { // recalculate time left using datetime
      if (timeLeft > 0) {
        setTimeLeft(timeLeft => timeLeft - 1);
      }
    }, [timeLeft])
    , 1000)

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      {timeLeft
        ? <Form>
          <Form.Group className='mb-3'>
            <h1>{question} &#40; {questionType} &#41;</h1>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Text>
              <Row>
                <Col>Time left: {timeLeft}</Col>
                <Col>Points: {points}</Col>
              </Row>
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            {answers.map((answer, index) => (
              <Form.Check onClick={(e) => {
                if (e.target.checked) {
                  addToAnswerList(answer, index);
                } else {
                  removeFromAnswerList(index);
                }
              }}key={ index } type={type} label={answer} />
            ))}
          </Form.Group>
        </Form>
        : <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '15vh' }}>
          <h1>Time is up! The correct answers were:</h1>
          <h1>{displayAnswer && answerList.map((option, index) => (
            <div key={index}>
              {`${option[0]}  `}
            </div>
          ))}</h1>
          </div>}
    </div>
  );
}

export default QuizQuestion;
