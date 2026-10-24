import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionCard from '../components/questioncard';
import EditBasicInfo from '../components/basicinfo';
import CustomButton from '../components/custombutton';

const EditQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = React.useState([]);
  const nav = useNavigate();

  React.useEffect(async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    if (!response.ok) {
      window.alert(data.error);
    }
    setQuestions(data.questions);
  }, [])

  return (
    <>
      <EditBasicInfo />
      {questions.map(question => (
        <>
          <QuestionCard title={question.question} quizId={quizId} questionId={question.questionId} questionType={question.answer.questionType} timeLimit={question.timeLimit} points={question.points} answers={question.answers} answer={question.answer.answer} allOptions={question.allOptions}/>
        </>
      ))}
      <div style={{ marginTop: '1vh', marginLeft: '0.5vw' }}><CustomButton onClick={() => { nav(`add/${Date.now()}`) }} variant='dark' text='+'/></div>
    </>);
};

export default EditQuiz;
