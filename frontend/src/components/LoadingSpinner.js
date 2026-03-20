import React from 'react';

const LoadingSpinner = ({ message = 'Analyzing...' }) => (
  <div className="spinner-container">
    <div className="spinner-ring">
      <div className="spinner-inner" />
    </div>
    <p className="spinner-message">{message}</p>
  </div>
);

export default LoadingSpinner;
