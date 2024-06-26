import React from 'react';
import './Alert.css';
const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Alert;
