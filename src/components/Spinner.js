import React from 'react';
import './css/spinner.css';

const Spinner = ({ isVisible = true }) => {
  return (
    <div style={{ visibility: isVisible ? 'visible' : 'hidden' }} className='loader-container'>
      <div className='loader'></div>
      <p className='loader-label'>Ladataan..</p>
    </div>
  );
};

export default Spinner;
