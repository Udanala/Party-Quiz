import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CustomButton from '../components/custombutton';

const AdminPage = () => {
  const sessionId = useParams().sessionId;
  const { state } = useLocation();
  const { quizId } = state;
  console.log(sessionId);
  console.log(quizId);
  const advanceQuestion = async (quizId) => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizId}/advance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
    const data = await response.json();
    console.log('advance: ', data)
    if (!response.ok) {
      console.log('last question', data)
      window.alert(data.error);
    }
  }

  const endQuiz = async (quizId) => {
    localStorage.setItem(quizId, 'false');
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizId}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
    if (!response.ok) {
      window.alert('error');
    }
  }

  return (
    <div>
      <CustomButton variant='dark' text='Advance' onClick={() => { advanceQuestion(quizId) }}></CustomButton>
      <br />
      <br />
      <CustomButton variant='dark' text='End Quiz' onClick={() => { endQuiz(quizId) }}></CustomButton>
    </div>
  );
}

export default AdminPage;
