import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './css/header.css';

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <header className='header'>
      <img
        className='app-logo'
        src={require(theme === 'dark' ? './icons/app-logo-dark.svg' : './icons/app-logo-light.svg')}
      />
      <i
        className='material-icons-round'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        invert_colors
      </i>
    </header>
  );
};

export default Header;
