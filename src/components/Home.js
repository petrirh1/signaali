import React from 'react';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import Loader from '../components/Loader';
import NoResults from '../components/NoResults';
import PropTypes from 'prop-types';
import BackToTop from './BackToTop';

const title = document.title;

const Home = ({ userFilter, data, filtered, isLoading, hasError }) => {
  document.title = title;

  return (
    <div>
      <BackToTop />
      <SearchForm userFilter={userFilter} data={filtered} isLoading={isLoading} />
      <div className='content-container'>
        {isLoading
          ? [...new Array(100)].map((d, i) => <Loader data={d} key={i} hasError={hasError} />)
          : filtered.map((data, index) => <Card data={data} key={index} />)}
        {filtered.length < 1 ? <NoResults isLoading={isLoading} hasError={hasError} /> : null}
      </div>
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
