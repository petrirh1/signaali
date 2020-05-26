import React from 'react';
import PropTypes from 'prop-types';
import capitalize from '../utils/capitalize';

import '../components/css/footer.css';

const Footer = ({ statistics }) => {
	const mostCommonPlace = statistics[0];
	const mostCommonType = capitalize(statistics[1]);
	const count = statistics[2];
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className='footer-container'>
				<div className='wrapper'>
					<h2 className='title'>{count}</h2>
					<p className='subtitle'>Hälytystä</p>
				</div>
				<div className='wrapper'>
					<h2 className='title'>{mostCommonType || '-'}</h2>
					<p className='subtitle'>Yleisin hälytys</p>
				</div>

				<div className='wrapper'>
					<h2 className='title'>{mostCommonPlace || '-'}</h2>
					<p className='subtitle'>Kiireisin paikkakunta</p>
				</div>
			</div>
			<div className='copyright'>
				<p>
					<span className='copyright-symbol'> &copy;</span>
					Copyright {year}, Signaali
				</p>
			</div>
		</footer>
	);
};

export default Footer;

Footer.propTypes = {
	statistics: PropTypes.array
};
