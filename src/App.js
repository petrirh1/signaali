import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import SearchForm from './components/SearchForm';
import Header from './components/Header';
import Loader from './components/Loader';
import NoResults from './components/NoResults';
import { BackTop } from 'antd';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/alert')
      .then(res => {
        setData(res.data.rss.channel[0].item);
        setFiltered(res.data.rss.channel[0].item);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const userFilter = searchTerm => {
    const newData = [...data];

    const filtered = newData.filter(d =>
      d.title[0].toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFiltered(filtered);
  };

  return (
    <ThemeProvider>
      <div className='App'>
        <BackTop style={{ right: '2rem', bottom: '2rem' }} />
        <Header />
        <SearchForm userFilter={userFilter} data={filtered} />
        <div className='content-container'>
          {isLoading
            ? [...new Array(100)].map((data, index) => <Loader data={data} key={index} />)
            : filtered.map((data, index) => <Card data={data} key={index} />)}
          {filtered.length < 1 ? <NoResults dataLen={data.length} /> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
