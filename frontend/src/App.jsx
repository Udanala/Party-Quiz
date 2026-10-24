import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import EditQuiz from './pages/editquiz';
import CustomToast from './components/customtoast';
import EditQuestion from './pages/editquestion';
import AddQuestion from './pages/addquestion';
import JoinGame from './pages/joingame';
import LobbyPage from './pages/lobby';
import AdminPage from './pages/admin';

// TODO
// add toast for login errors, creating quizes
// BUG LIST
// navbar dashboard icon doesnt render immediately upon register/login - requires a refresh
// how to change question component upon receiving the next question
// console errors

function App () {
  const [showToast, setShowToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register setToastMsg={setToastMsg} setShowToast={setShowToast}/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/join' element={<JoinGame />} />
          <Route path='/join/:sessionId' element={<JoinGame />} />
          <Route path='/lobby/:sessionId' element={<LobbyPage />} />
          <Route path='/admin/:sessionId' element={<AdminPage />} />
          <Route path='/dashboard/editquiz/:quizId' element={<EditQuiz/>} />
          <Route path='/dashboard/editquiz/:quizId/add/:questionId' element={<AddQuestion/>} />
          <Route path='/dashboard/editquiz/:quizId/edit/:questionId' element={<EditQuestion/>} />
        </Routes>
      </BrowserRouter>
      <CustomToast message={toastMsg} setShowToast={setShowToast} showToast={showToast}></CustomToast>
    </>
  );
}

export default App;
