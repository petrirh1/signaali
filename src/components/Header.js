import React, { useContext } from 'react';
import Tooltip from 'antd/es/tooltip';
import PropTypes from 'prop-types';
import { ThemeContext } from './ThemeContext';
import { NavLink, Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import './css/header.css';

const Header = ({ isLoading, hasError }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const maxWidth500 = useMediaPredicate('(max-width: 500px)');
  const isMobile = useMediaPredicate('(hover: none)');

  const handleClick = () => {
    handleThemeChange();
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleThemeChange();
    }
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className='header'>
      <Link exact to='/' tabIndex='0'>
        <img
          className='app-logo'
          src={require(theme === 'dark'
            ? './icons/app-logo-dark.svg'
            : './icons/app-logo-light.svg')}
          alt=''
        />
      </Link>
      <div className='header-container' style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <i
          style={{ display: hasError ? 'block' : 'none' }}
          className='material-icons-round header-error-icon'>
          warning
        </i>
        <nav className='header-nav'>
          <ul className='header-nav-links'>
            <NavLink activeClassName='nav-link-active' exact to='/' tabIndex='0'>
              <li>
                <i className='material-icons-round'>notifications</i>
                {maxWidth500 ? '' : 'Hälytykset'}
              </li>
            </NavLink>
            <NavLink activeClassName='nav-link-active' to='/kartta' tabIndex='0'>
              <li>
                <i className='material-icons-round'>map</i>
                {maxWidth500 ? '' : 'Kartta'}
              </li>
            </NavLink>
          </ul>
        </nav>
        <Tooltip
          trigger={isMobile ? 'click' : 'hover'}
          overlayStyle={{ visibility: isMobile ? 'hidden' : 'visible' }}
          mouseLeaveDelay={0}
          placement='bottomRight'
          title='Vaihda teema'>
          <div
            className='theme-toggle-btn'
            tabIndex='0'
            onClick={handleClick}
            onKeyPress={handleKeyPress}>
            <i className='material-icons-round'>invert_colors</i>
          </div>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  isLoading: PropTypes.bool
};
