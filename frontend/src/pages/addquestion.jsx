import React from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionCard from '../components/addquestioncard';

const AddQuestion = () => {
  const { questionId } = useParams();
  console.log(questionId);
  return <>
  <AddQuestionCard />
  </>;
};

export default AddQuestion;
