import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import setIcon from '../utils/icon';
import 'antd/dist/antd.css';
import './css/card.css';

const Card = ({ data }) => {
	const { title, description, date } = data;
	const [redirect, setRedirect] = useState(false);
	const [theme] = useContext(ThemeContext);
	const low = theme === 'dark' ? '#81848B' : '#878787';
	const medium = theme === 'dark' ? '#FFD160' : '#F5AD00';
	const high = theme === 'dark' ? '#FF5F54' : '#FE6D63';
	const lowBG = theme === 'dark' ? '#25262A' : '#f4f4f4';
	const mediumBG = theme === 'dark' ? '#262622' : '#FFF4D9';
	const highBG = theme === 'dark' ? '#262224' : '#FFEFEE';

	const severity = sentence => {
		sentence = sentence.toLowerCase();

		if (sentence.includes('keskisuuri')) {
			return medium;
		} else if (sentence.includes('suuri')) {
			return high;
		} else {
			return low;
		}
	};

	const handleClick = () => {
		handleRedirect();
	};

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleRedirect();
		}
	};

	const handleRedirect = () => {
		setRedirect(true);
	};

	return (
		<>
			{redirect ? (
				<Redirect
					push
					to={{
						pathname: '/kartta',
						search: '',
						state: {
							data: data
						}
					}}
				/>
			) : (
				<div
					className='alert-card'
					onClick={handleClick}
					onKeyPress={handleKeyPress}
					tabIndex='0'>
					<i
						className='material-icons-round'
						style={{
							transition: 'all 0.25s',
							color: severity(description),
							background:
								severity(description) === low
									? lowBG
									: severity(description) === medium
									? mediumBG
									: highBG,
							fontSize: '24px'
						}}>
						{setIcon(description)}
					</i>
					<div className='content-wrapper'>
						<h4 className='card-title'>{title}</h4>
						<p className='card-description'>{description}</p>
						<p className='card-date'>{date}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Card;

Card.propTypes = {
	data: PropTypes.object
};
