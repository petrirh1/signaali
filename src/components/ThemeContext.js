import React, { useState, useEffect, createContext } from 'react';
import { useMediaPredicate } from 'react-media-hook';

export const ThemeContext = createContext();

export const ThemeProvider = props => {
	const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)') ? 'dark' : 'light';
	const savedTheme = localStorage.getItem('theme') || preferredTheme;
	const [theme, setTheme] = useState(savedTheme);

	const switchTheme = () => {
		if (theme === 'dark' && (preferredTheme === 'dark' || preferredTheme === 'light')) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	};

	useEffect(
		() => {
			switchTheme();

			return () => {
				document.body.classList.add('no-transition');
				setTimeout(() => {
					document.body.classList.remove('no-transition');
				}, 0);
			};
		},
		// eslint-disable-next-line
		[theme]
	);

	return <ThemeContext.Provider value={[theme, setTheme]}>{props.children}</ThemeContext.Provider>;
};
