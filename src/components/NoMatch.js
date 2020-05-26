import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/no-match.css';

const NoMatch = () => {
	return (
		<div className='no-match-container'>
			<h1 className='no-match-title'>404</h1>
			<p className='no-match-description'>Sivua ei löytynyt..</p>
			<NavLink exact to='/'>
				<div className='no-match-link-wrapper'>
					<i className='material-icons-round'>keyboard_backspace</i>
					<p className='no-match-link-back'>Takaisin etusivulle</p>
				</div>
			</NavLink>
		</div>
	);
};

export default NoMatch;
