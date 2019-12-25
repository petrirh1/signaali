import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import 'antd/dist/antd.css';
import './css/card.css';

const Alert = ({ data }) => {
  const [theme] = useContext(ThemeContext);
  const low = theme === 'dark' ? '#888C8F' : '#9D9D9D';
  const medium = theme === 'dark' ? '#FFD160' : '#FFB500';
  const high = theme === 'dark' ? '#FF5F54' : '#FE6D63';
  const lowBG = theme === 'dark' ? '#25262A' : '#F5F5F5';
  const mediumBG = theme === 'dark' ? '#262622' : '#FFF8E8';
  const highBG = theme === 'dark' ? '#262224' : '#FFEFEE';

  const removeAfterSlash = sentence => {
    return sentence.replace(/\/.*?,/, ',');
  };

  const removeAfterLastNumber = sentence => {
    return sentence.replace(/\D+$/g, '');
  };

  const severity = sentence => {
    sentence = sentence.toLowerCase();

    if (sentence.includes('keskisuuri')) {
      return medium;
    } else if (sentence.includes('suuri') || sentence.includes('räjähdys')) {
      return high;
    } else {
      return low;
    }
  };

  const icon = sentence => {
    if (typeof sentence !== 'string') return 'warning';

    sentence = sentence.toLowerCase();

    if (sentence.includes('hälytys')) {
      return 'notifications_active';
    } else if (sentence.includes('palo')) {
      return 'whatshot';
    } else if (sentence.includes('vahingontorjunta')) {
      return 'eco';
    } else if (sentence.includes('tie')) {
      return 'directions_car';
    } else if (sentence.includes('vesi')) {
      return 'directions_boat';
    } else if (sentence.includes('raide')) {
      return 'directions_subway';
    } else if (sentence.includes('ilma')) {
      return 'flight';
    } else if (sentence.includes('ensivaste')) {
      return 'healing';
    } else if (sentence.includes('ihmisen')) {
      return 'emoji_people';
    } else if (sentence.includes('eläimen')) {
      return 'pets';
    } else if (sentence.includes('räjähdys')) {
      return 'report';
    } else if (sentence.includes('vaarallisen')) {
      return 'pan_tool';
    } else if (sentence.includes('öljy')) {
      return 'opacity';
    } else {
      return 'warning';
    }
  };

  return (
    <div className='alert-card'>
      <i
        className='material-icons-round'
        style={{
          color: severity(data.title[0]),
          background:
            severity(data.title[0]) === low
              ? lowBG
              : severity(data.title[0]) === medium
              ? mediumBG
              : highBG,
          fontSize: '38px'
        }}>
        {icon(data.title[0])}
      </i>
      <div className='content-wrapper'>
        <h4 className='card-title'>{removeAfterSlash(data.title[0])}</h4>
        <p className='card-description'>{removeAfterLastNumber(data.description[0])}</p>
      </div>
    </div>
  );
};

export default Alert;
