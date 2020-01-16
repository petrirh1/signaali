import React from 'react';
import PropTypes from 'prop-types';
import './css/no-results.css';

const NoResults = ({ hasError }) => {
  return (
    <div className='no-results-container'>
      <i className='material-icons-round' style={{ fontSize: '48px' }}>
        {hasError ? 'warning' : 'search'}
      </i>
      <p className='no-results-description'>
        {hasError ? 'Hups, jotain meni pieleen...' : 'Ei hakutuloksia'}
      </p>
    </div>
  );
};

export default NoResults;

NoResults.propTypes = {
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool
};
