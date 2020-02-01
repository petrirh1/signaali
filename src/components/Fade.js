import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Fade = ({ show, children }) => {
	const [shouldRender, setRender] = useState(show);

	useEffect(() => {
		if (show) setRender(true);
	}, [show]);

	const onAnimationEnd = () => {
		if (!show) setRender(false);
	};

	return (
		shouldRender && (
			<div className={show ? 'fadeIn' : 'fadeOut'} onAnimationEnd={onAnimationEnd}>
				{children}
			</div>
		)
	);
};

export default Fade;

Fade.propTypes = {
	show: PropTypes.bool,
	children: PropTypes.object
};
