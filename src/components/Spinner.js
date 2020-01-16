import React from 'react';
import PropTypes from 'prop-types';
import './css/spinner.css';

const Spinner = () => {
  return (
    <div className='loader-container'>
      <div className='loader'></div>
      <p className='loader-label'>Ladataan..</p>
    </div>
  );
};

export default Spinner;
