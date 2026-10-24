import { Card, Stack, Form, Dropdown } from 'react-bootstrap';
import React, { useRef } from 'react';
import CustomButton from './custombutton';
import DeleteIcon from './deleteicon';
import { useNavigate, useParams } from 'react-router-dom';

const AddQuestionCard = () => {
  const nav = useNavigate();
  const params = useParams();
  const initialAnswer = ['', false]

  const [dropdownText, setDropdownText] = React.useState('Choose a Question Type');
  const [addQuestionDisabled, setAddQuestionDisabled] = React.useState(false);
  const [optionList, setOptionList] = React.useState([]);

  const questionRef = useRef('question');
  const timeRef = useRef('time');
  const pointsRef = useRef('points');

  const answer1Ref = useRef('answer1');
  const switch1Ref = useRef('switch1');
  const answer2Ref = useRef('answer2')
  const switch2Ref = useRef('switch2');

  async function fetchQuiz () {
    try {
      const response = await fetch(`http://localhost:5005/admin/quiz/${params.quizId}`, {
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
      return data
    } catch (error) {
      alert(error);
    }
  }

  const addAnswer = () => {
    if (optionList.length === 3) {
      setAddQuestionDisabled(true);
    }

    if (optionList.length < 4) {
      const newList = [...optionList, initialAnswer];
      setOptionList(newList);
    }
  }

  const removeAnswer = (index) => {
    const newList = [...optionList];
    newList.splice(index, 1);
    setOptionList(newList);
    setAddQuestionDisabled(false);
  }

  const handleAnswerChange = (event, index) => {
    const newList = [...optionList];
    newList[index][0] = event.target.value;
    setOptionList(newList)
  }

  const handleSwitchChange = (event, index) => {
    const newList = [...optionList];
    newList[index][1] = event.target.checked;
    setOptionList(newList)
  }

  const submit = () => {
    const answer1 = [answer1Ref.current.value, switch1Ref.current.checked];
    const answer2 = [answer2Ref.current.value, switch2Ref.current.checked];

    const newList = [answer1, answer2, ...optionList];
    const answersList = newList.filter(option => option[1]);
    // const restList = newList.filter(option => !option[1]);
    const question = {
      questionId: params.questionId,
      question: questionRef.current.value,
      answer: {
        questionType: dropdownText,
        answer: answersList
      },
      timeLimit: timeRef.current.value,
      points: pointsRef.current.value,
      // answers: restList,
      allOptions: newList
    }

    async function addQuestion () {
      try {
        if (questionRef.current.value === '') {
          throw new Error('please enter a question name');
        }
        if (timeRef.current.value === '') {
          throw new Error('please enter the time limit');
        }
        if (pointsRef.current.value === '') {
          throw new Error('please enter the points');
        }
        if (dropdownText === 'Choose a Question Type') {
          throw new Error(dropdownText);
        }
        if (dropdownText === 'Single' && answersList.length !== 1) {
          throw new Error('please give 1 correct answer');
        }
        if (dropdownText === 'Multiple' && answersList.length <= 1) {
          throw new Error('please give multiple correct answers');
        }

        if (answer1Ref.current.value === '' && answer2Ref.current.value === '') {
          throw new Error('please fill at least 2 options')
        }

        const quizInfo = await fetchQuiz();

        if (quizInfo.questions !== undefined) {
          quizInfo.questions = [...quizInfo.questions, question];
        } else {
          quizInfo.questions = [question];
        }

        const response = await fetch(`http://localhost:5005/admin/quiz/${params.quizId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(quizInfo)
        });
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          throw new Error(data.error);
        }
        nav(`/dashboard/editquiz/${params.quizId}`)
      } catch (error) {
        alert(error);
      }
    }
    addQuestion();
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Add a Question</Card.Title>
          <Form.Group className='mb-3'>
            <Form.Label>Question:</Form.Label>
            <Form.Control type='text' placeholder='Enter Question' ref={ questionRef } />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Time Limit (seconds):</Form.Label>
            <Form.Control type='number' min={0} placeholder='Enter a Time Limit' ref={ timeRef } />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Points:</Form.Label>
            <Form.Control type='number' min={0} placeholder='Enter Points' ref={ pointsRef } />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Question Type:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant='dark' id='dropdown-basic'>{ dropdownText }</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { setDropdownText('Single') }}>Single</Dropdown.Item>
                <Dropdown.Item onClick={() => { setDropdownText('Multiple') }}>Multiple</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Options:</Form.Label>
            <Stack direction='horizontal' gap={3}>
              <Form.Control style={{ width: '80vw' }} type='text' placeholder='Option' ref={ answer1Ref } />
              <Form.Check type="switch" label="Correct" ref={ switch1Ref }/>
            </Stack>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Stack direction='horizontal' gap={3}>
              <Form.Control style={{ width: '80vw' }} type='text' placeholder='Option' ref={answer2Ref} />
              <Form.Check type="switch" label="Correct" ref={switch2Ref} />
            </Stack>
          </Form.Group>

          {optionList.map((data, index) => (
            <div key={ index }>
              <Stack direction='horizontal' gap={3}>
                <Form.Control style={{ width: '80vw' }} type='text' placeholder='Option' value={data[0]} onChange={event => {
                  handleAnswerChange(event, index)
                }}/>
                <Form.Check type="switch" label="Correct" checked={data[1]} onClick={event => {
                  event.target.checked = !data[1];
                  handleSwitchChange(event, index);
                }}/>
                <DeleteIcon onClick={ () => { removeAnswer(index) } }></DeleteIcon>
              </Stack>
              <br></br>
            </div>
          ))}

          <Form.Group className='mb-3'>
            <CustomButton disabled={addQuestionDisabled} onClick={ addAnswer } variant='dark' text='+'/>
          </Form.Group>

          <CustomButton onClick={ submit } variant='dark' text='Add Question'/>

        </Card.Body>
      </Card>
    </>
  );
};

export default AddQuestionCard;
