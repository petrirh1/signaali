import React from 'react';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';
import NoResults from '../components/NoResults';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import BackToTop from './BackToTop';

import getStatistics from '../utils/statistics';

const title = document.title;

const Home = ({ userFilter, data, filtered, isLoading, hasError }) => {
	document.title = title;
	const statistics = getStatistics(data, 'title', 'type');

	return (
		<div>
			<BackToTop />
			<SearchForm userFilter={userFilter} isLoading={isLoading} />
			<div className='content-container'>
				{isLoading
					? [...new Array(100)].map((d, i) => (
							<CardSkeleton data={d} key={i} hasError={hasError} />
					  ))
					: filtered.map((data, index) => <Card data={data} key={index} />)}
				{filtered.length < 1 ? (
					<NoResults isLoading={isLoading} hasError={hasError} />
				) : null}
			</div>
			<Footer statistics={statistics} />
		</div>
	);
};

export default Home;

Home.propTypes = {
	userFilter: PropTypes.func,
	data: PropTypes.array,
	filtered: PropTypes.array,
	isLoading: PropTypes.bool
};
