import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import Header from './components/Header';
import Map from './components/Map';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  removeWordsAfterSlash as cleanUpString,
  removeWordsAfterLastNumber as cleanUpDescription,
  getCoordinates,
  setAlertType
} from './components/Utils';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ReactGA.initialize('UA-155353804-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    axios
      .get('/api/alerts')
      .then(res => {
        const { item } = res.data.rss.channel[0];

        const newItem = item.map(v => ({
          title: cleanUpString(v.title[0])[0],
          type: setAlertType(v.description[0]),
          description: cleanUpString(v.title[0])[1],
          date: cleanUpDescription(v.description[0]),
          latitude: getCoordinates(v.title[0])[0],
          longitude: getCoordinates(v.title[0])[1]
        }));

        setData(newItem);
        setFiltered(newItem);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
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
          <Header />
          <Switch>
            <Route
              path='/'
              exact
              strict
              render={() => (
                <Home
                  userFilter={userFilter}
                  data={data}
                  filtered={filtered}
                  isLoading={isLoading}
                />
              )}
            />
            <Route path='/kartta' exact strict render={() => <Map data={data} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
