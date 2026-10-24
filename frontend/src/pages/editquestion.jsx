import React from 'react';
import { useLocation } from 'react-router-dom';
import EditQuestionCard from '../components/editquestioncard';

const EditQuestion = () => {
  const { state } = useLocation();
  const { title, questionType, timeLimit, points, answers, answer, allOptions } = state;
  return (
    <>
      <EditQuestionCard title={title} questionType={questionType} timeLimit={timeLimit} points={points} answers={answers} answer={answer} allOptions={allOptions} />
    </>
  );
};

export default EditQuestion;
