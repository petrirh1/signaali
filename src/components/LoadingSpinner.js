import React from 'react';
import './css/loading-spinner.css';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div className='loader-container' style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
      <div className='loader'></div>
    </div>
  );
};

export default LoadingSpinner;
