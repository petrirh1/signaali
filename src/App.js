import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import axios from 'axios';
import Header from './components/Header';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import parse from './utils/parse';
import Spinner from './components/Spinner';
import './App.css';

const Map = lazy(() => import('./components/Map'));

function App() {
	const [data, setData] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useEffect(() => {
		ReactGA.initialize('UA-155353804-1');
		ReactGA.pageview(window.location.pathname + window.location.search);

		axios
			.get('/api/alerts')
			.then(res => {
				const { item } = res.data.rss.channel[0];
				const newItem = parse(item);

				setData(newItem);
				setFiltered(newItem);
			})
			.catch(err => {
				setError(true);
			})
			.finally(() => setLoading(false));
	}, []);

	// outline for accessibility
	useEffect(() => {
		const addClass = () => {
			document.body.classList.add('using-mouse');
		};

		const removeClass = e => {
			if (e.key !== 'Tab') return;
			document.body.classList.remove('using-mouse');
		};

		document.body.addEventListener('mousedown', addClass);
		document.body.addEventListener('keydown', removeClass);

		return () => {
			document.body.removeEventListener('mousedown', addClass);
			document.body.removeEventListener('keydown', removeClass);
		};
	}, []);

	const userFilter = searchTerm => {
		const newData = [...data];

		const filtered = newData.filter(d =>
			d.title.toLowerCase().startsWith(searchTerm.toLowerCase())
		);
		setFiltered(filtered);
	};

	return (
		<ThemeProvider>
			<Router>
				<div className='App'>
					<Header isLoading={isLoading} />
					<Suspense fallback={<Spinner />}>
						<Switch>
							<Route
								path='/'
								exact
								strict
								render={props => (
									<Home
										{...props}
										userFilter={userFilter}
										data={data}
										filtered={filtered}
										isLoading={isLoading}
										hasError={hasError}
									/>
								)}
							/>
							<Route path='/kartta' exact strict render={props => <Map {...props} data={data} />} />
							<Route component={NoMatch} />
						</Switch>
					</Suspense>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
