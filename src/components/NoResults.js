import React from 'react';
import './css/no-results.css';

const NoResults = ({ dataLen }) => {
  return (
    <div className='no-results-container'>
      <i className='material-icons-round' style={{ fontSize: '48px' }}>
        {dataLen > 0 ? 'search' : 'warning'}
      </i>
      <p className='no-results-description'>
        {dataLen > 0 ? 'Ei hakutuloksia' : 'Hups, jotain meni pieleen...'}
      </p>
    </div>
  );
};

export default NoResults;
