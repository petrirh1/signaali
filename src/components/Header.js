import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './css/header.css';

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <header className='header'>
      <h3 className='app-title'>
        signaali<sup>+</sup>
      </h3>
      <i
        className='material-icons-round'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        invert_colors
      </i>
    </header>
  );
};

export default Header;
