import React from 'react';
import { BackTop } from 'antd';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import Loader from '../components/Loader';
import NoResults from '../components/NoResults';
import PropTypes from 'prop-types';

const Home = ({ userFilter, data, filtered, isLoading }) => {
  return (
    <div>
      <BackTop visibilityHeight={2000} style={{ right: '2rem', bottom: '2rem' }} />
      <SearchForm userFilter={userFilter} data={filtered} />
      <div className='content-container'>
        {isLoading
          ? [...new Array(100)].map((d, i) => <Loader data={d} key={i} />)
          : filtered.map((data, index) => <Card data={data} key={index} />)}
        {filtered.length < 1 ? <NoResults dataLen={data.length} isLoading={isLoading} /> : null}
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
