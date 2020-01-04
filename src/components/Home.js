import React from 'react';
import { BackTop } from 'antd';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import Loader from '../components/Loader';
import NoResults from '../components/NoResults';

const Home = ({ userFilter, data, filtered, isLoading }) => {
  return (
    <div>
      <BackTop style={{ right: '2rem', bottom: '2rem' }} />
      <SearchForm userFilter={userFilter} data={filtered} />
      <div className='content-container'>
        {isLoading
          ? [...new Array(100)].map((data, index) => <Loader data={data} key={index} />)
          : filtered.map((data, index) => <Card data={data} key={index} />)}
        {filtered.length < 1 ? <NoResults dataLen={data.length} /> : null}
      </div>
    </div>
  );
};

export default Home;