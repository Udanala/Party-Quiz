import { Card, Stack } from 'react-bootstrap';
import React from 'react';
import CustomButton from './custombutton';
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({ title, questionId, questionType, timeLimit, points, answer, allOptions }) => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`edit/${questionId}`, { state: { title, questionType, timeLimit, points, answer, allOptions } });
  }

  const formatAnswer = (answers) => {
    let answerList = '';
    for (let i = 0; i < answers.length; i++) {
      answerList += `${answers[i][0]}, `
    }
    // Remove last comma and whitespace
    answerList = answerList.substring(0, answerList.length - 2);
    return answerList;
  }

  return (
    <Card role='questioncard'>
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          <br></br>
          <Stack direction='horizontal' gap={3}>
            <span>Question Type: {questionType}</span>
            <span>Time Limit: {timeLimit} seconds</span>
            <span>Points: {points}</span>
            <span>Options: {formatAnswer(allOptions)}</span>
            <span>Correct Answer: {formatAnswer(answer)}</span>
          </Stack>
        </Card.Subtitle>
          <CustomButton onClick={routeChange} variant='dark' text='Edit Question'></CustomButton>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
