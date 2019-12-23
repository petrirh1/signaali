import React from 'react';
import './css/no-results.css';

const NoResults = () => {
  return (
    <div className='no-results-container'>
      <i className='material-icons-round' style={{ fontSize: '48px' }}>
        search
      </i>
      <p className='no-results-description'>Ei hakutuloksia</p>
    </div>
  );
};

export default NoResults;
