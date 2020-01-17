import React from 'react';
import BackTop from 'antd/es/back-top';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import Loader from '../components/Loader';
import NoResults from '../components/NoResults';
import PropTypes from 'prop-types';

const Home = ({ userFilter, data, filtered, isLoading, hasError }) => {
  return (
    <div>
      <BackTop style={{ right: '2rem', bottom: '2rem' }} />
      <SearchForm userFilter={userFilter} data={filtered} isLoading={isLoading} />
      <div className='content-container'>
        {isLoading
          ? [...new Array(100)].map((d, i) => <Loader data={d} key={i} />)
          : filtered.map((data, index) => <Card data={data} key={index} />)}
        {filtered.length < 1 ? <NoResults hasError={hasError} /> : null}
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
