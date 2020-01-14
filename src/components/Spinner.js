import React from 'react';
import PropTypes from 'prop-types';
import './css/spinner.css';

const Spinner = ({ isLoading }) => {
  return (
    <div className='loader-container' style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
      <div className='loader'></div>
      <p className='loader-label'>Ladataan..</p>
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  isLoading: PropTypes.bool
};
