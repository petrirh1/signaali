import React, { useState, useEffect, Suspense, lazy } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import Header from './components/Header';
// import Map from './components/Map';
// import Home from './components/Home';
import NoMatch from './components/NoMatch';
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { parseData } from './components/Utils';
import './App.css';

const Home = lazy(() => import('./components/Home'));
const Map = lazy(() => import('./components/Map'));

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
        const newItem = parseData(item);

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
          <Suspense fallback={<div>Loading...</div>}>
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
