import React from 'react';
import PropTypes from 'prop-types';
import './css/no-results.css';

const NoResults = ({ isLoading, hasError }) => {
	return (
		<div className='no-results-container'>
			<i className='material-icons-round' style={{ fontSize: '48px' }}>
				{hasError && !isLoading ? 'warning' : isLoading ? null : 'search'}
			</i>
			<p className='no-results-description'>
				{hasError && !isLoading
					? 'Hups, jotain meni pieleen...'
					: isLoading
					? null
					: 'Ei hakutuloksia'}
			</p>
		</div>
	);
};

export default NoResults;

NoResults.propTypes = {
	isLoading: PropTypes.bool,
	hasError: PropTypes.bool
};
