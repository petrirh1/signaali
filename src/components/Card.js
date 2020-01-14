import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import PropTypes from 'prop-types';
import { setIcon } from './Utils';
import 'antd/dist/antd.css';
import './css/card.css';

const Card = ({ data }) => {
  const { title, description, date, latitude, longitude } = data;
  const [redirect, setRedirect] = useState(false);
  const [theme] = useContext(ThemeContext);
  const low = theme === 'dark' ? '#888C8F' : '#878787';
  const medium = theme === 'dark' ? '#FFD160' : '#F5AD00';
  const high = theme === 'dark' ? '#FF5F54' : '#FE6D63';
  const lowBG = theme === 'dark' ? '#25262A' : '#F5F5F5';
  const mediumBG = theme === 'dark' ? '#262622' : '#FFF4D9';
  const highBG = theme === 'dark' ? '#262224' : '#FFEFEE';

  const severity = sentence => {
    sentence = sentence.toLowerCase();

    if (sentence.includes('keskisuuri')) {
      return medium;
    } else if (sentence.includes('suuri')) {
      return high;
    } else {
      return low;
    }
  };

  const handleClick = () => {
    setRedirect(true);
  };

  return (
    <>
      {redirect ? (
        <Redirect
          push
          to={{
            pathname: '/kartta',
            search: '',
            state: {
              lat: latitude,
              long: longitude
            }
          }}
        />
      ) : (
        <div className='alert-card' onClick={handleClick}>
          <i
            className='material-icons-round'
            style={{
              color: severity(description),
              background:
                severity(description) === low
                  ? lowBG
                  : severity(description) === medium
                  ? mediumBG
                  : highBG,
              fontSize: '24px'
            }}>
            {setIcon(description)}
          </i>
          <div className='content-wrapper'>
            <h4 className='card-title'>{title}</h4>
            <p className='card-description'>{description}</p>
            <p className='card-date'>{date}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.object
};
