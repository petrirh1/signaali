import React from 'react';
import PropTypes from 'prop-types';
import './css/no-results.css';

const NoResults = ({ dataLen, isLoading }) => {
  console.log(isLoading);
  return (
    <div className='no-results-container'>
      <i className='material-icons-round' style={{ fontSize: '48px' }}>
        {dataLen > 0 ? 'search' : isLoading ? null : 'warning'}
      </i>
      <p className='no-results-description'>
        {dataLen > 0 ? 'Ei hakutuloksia' : isLoading ? null : 'Hups, jotain meni pieleen...'}
      </p>
    </div>
  );
};

export default NoResults;

NoResults.propTypes = {
  dataLen: PropTypes.number
};
