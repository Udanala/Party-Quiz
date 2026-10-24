import React from 'react';
import { useLocation } from 'react-router-dom';
import QuizQuestion from '../components/quizquestion';
import { useInterval } from '../useInterval';
import Waiting from '../components/waiting';

const LobbyPage = () => {
  const [timeLimit, setTimeLimit] = React.useState(10);
  const [timeDate, setTimeDate] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [questionType, setQuestionType] = React.useState('');
  const [answers, setAnswers] = React.useState();
  const [points, setPoints] = React.useState(0);
  const [status, setStatus] = React.useState(0); // 0 = not started, 1 = started, 2 = finished
  const [questionId, setQuestionId] = React.useState('');
  const [keepFetching, setKeepFetching] = React.useState(true);
  const { state } = useLocation();
  const { playerId } = state;
  const [results, setResults] = React.useState([]);
  const getQuestionData = async (playerId) => {
    const response = await fetch(`http://localhost:5005/play/${playerId}/question`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    setTimeDate(data.question.isoTimeLastQuestionStarted);
    setQuestionType(data.question.answer.questionType);
    setQuestion(data.question.question);
    setPoints(data.question.points);
    setTimeLimit(data.question.timeLimit);
    setAnswers(data.question.allOptions);
    setQuestionId(data.question.questionId);
  }

  const getResults = async () => {
    const response = await fetch(`http://localhost:5005/play/${playerId}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = await response.json();
    setResults(data);
    console.log(data);
  }

  useInterval(async () => {
    let response1;
    let data;
    if (keepFetching) {
      response1 = await fetch(`http://localhost:5005/play/${playerId}/status`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      data = await response1.json();
    }
    if (!response1.ok) {
      setStatus(2);
      setKeepFetching(false);
      getResults();
    }
    if (data.started) { // continually fetch/update game data
      await getQuestionData(playerId);
      // await getAnswer(playerId);
      setStatus(1);
    }
    if (status === 1) {
      await getQuestionData(playerId);
    }
  }, 1000)
  return (
    <div>
      {status === 0 &&
        // 'Please wait for the host to start...'
        <Waiting></Waiting>
      }
      {status === 1 &&
        <QuizQuestion
          timeDate={ timeDate }
          points={ points }
          answers={ answers }
          playerId={ playerId }
          timeLimit={ timeLimit }
          question={ question }
          questionType={ questionType }
          questionId={questionId} />
      }
      {status === 2 &&
      // results page
      <div>{
        results.map((result, index) => (
          <div key={result.questionStartedAt}>
            Your answers to question number {index + 1}:
            {result.answerIds.map(res => (
              <div key={res}>{ res }</div>
            ))} were
            {result.correct ? ' correct' : ' incorrect'}
            <br></br>
            <br></br>
          </div>
        ))}</div>
      }
    </div>
  );
}

export default LobbyPage;
