import { React, useEffect, useRef, useState } from 'react';
import { DropdownButton, Dropdown, Modal, Button, Form, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fileToDataUrl } from './helpers';
// import Image from 'react-bootstrap/Image';
// import { Card } from 'react-bootstrap/Card';
const EditBasicInfo = () => {
  // const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [renameShow, setRenameShow] = useState(false);
  const [thumbnailShow, setThumbnailShow] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});

  const handleRenameClose = () => setRenameShow(false);
  const handleRenameShow = () => setRenameShow(true);

  const handlethumbnailClose = () => setThumbnailShow(false);
  const handlethumbnailShow = () => setThumbnailShow(true);

  const renameRef = useRef('rename');
  const thumbnailRef = useRef('thumbnail');

  const params = useParams();

  async function fetchQuestion () {
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
      // setName(data.name);
      setQuizInfo(data);
      setUrl(data.thumbnail);
      // return data
    } catch (error) {
      alert(error);
    }
  }

  const submitRename = () => {
    async function rename () {
      try {
        if (renameRef.current.value === '') {
          throw new Error('Please enter a name');
        }
        // const quizInfo = await fetchQuestion();
        quizInfo.name = renameRef.current.value;
        console.log('rename', params.quizId);
        const response = await fetch(`http://localhost:5005/admin/quiz/${params.quizId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(quizInfo)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
      }
    }
    rename();
    console.log('rename')
    handleRenameClose();
    // window.location.reload(false);
  }

  const submitThumbnail = () => {
    async function thumbnail () {
      try {
        if (thumbnailRef.current.value === '') {
          throw new Error('Please upload an image');
        }
        // const quizInfo = await fetchQuestion();
        console.log('thumbnail', thumbnailRef.current.files[0]);
        const dataUrl = await fileToDataUrl(thumbnailRef.current.files[0])
        quizInfo.thumbnail = dataUrl;
        setUrl(dataUrl);
        const response = await fetch(`http://localhost:5005/admin/quiz/${params.quizId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(quizInfo)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
      }
    }
    thumbnail();
    console.log('thumbnail');
    handlethumbnailClose();
  }

  useEffect(fetchQuestion, []);
  console.log('quiz info', quizInfo)
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2 style={{ display: 'block', float: 'left' }}>{quizInfo.name}</h2>
            <DropdownButton style={{ display: 'block', float: 'right' }} title="Settings" variant="dark">
                <Dropdown.Item onClick={handleRenameShow}>Rename</Dropdown.Item>
                <Dropdown.Item onClick={handlethumbnailShow}>Update Thumbnail</Dropdown.Item>
            </DropdownButton>
          </Card.Title>
          <Card.Img src={url} thumbnail></Card.Img>
        </Card.Body>
      </Card>

      <Modal show={renameShow} onHide={handleRenameClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type='text' placeholder='Enter name here' ref={renameRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRenameClose}>
            Close
          </Button>
          <Button variant="dark" onClick={submitRename}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={thumbnailShow} onHide={handlethumbnailClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update thumbnail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type='file' ref={thumbnailRef} accept='image/png, image/jpeg'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlethumbnailClose}>
            Close
          </Button>
          <Button variant="dark" onClick={submitThumbnail}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>

  );
}

export default EditBasicInfo;
