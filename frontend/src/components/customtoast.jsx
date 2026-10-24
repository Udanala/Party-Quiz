import { Toast } from 'react-bootstrap';
import React from 'react';
const CustomToast = ({ message, setShowToast, showToast }) => {
  return (
    <Toast onClose={() => setShowToast(false)} show={showToast} position='bottom-start' delay={3000} autohide>
      <Toast.Header>
        <img
          src='holder.js/20x20?text=%20'
          className='rounded me-2'
          alt=''
        />
        <strong className='me-auto'>BigBrain</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
