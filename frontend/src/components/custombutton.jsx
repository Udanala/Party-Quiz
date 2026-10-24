import { Button } from 'react-bootstrap';
import React from 'react';

const CustomButton = ({ name, text, variant, width, height, onClick, disabled = false }) => {
  return <Button name={name} disabled={disabled} style={{ width, height }} variant={ variant } onClick={onClick}>{ text }</Button>;
};

export default CustomButton;
