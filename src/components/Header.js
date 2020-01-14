import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { NavLink, Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Tooltip from 'antd/es/tooltip';
import PropTypes from 'prop-types';
import './css/header.css';

const Header = ({ isLoading }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const maxWidth500 = useMediaPredicate('(max-width: 500px)');
  const isMobile = useMediaPredicate('(hover: none)');

  return (
    <header className='header'>
      <Link exact to='/'>
        <img
          className='app-logo'
          src={require(theme === 'dark'
            ? './icons/app-logo-dark.svg'
            : './icons/app-logo-light.svg')}
          alt=''
        />
      </Link>
      <div className='header-container' style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <nav className='header-nav'>
          <ul className='header-nav-links'>
            <NavLink activeClassName='nav-link-active' exact to='/'>
              <li>
                <i className='material-icons-round'>notifications</i>
                {maxWidth500 ? '' : 'Hälytykset'}
              </li>
            </NavLink>
            <NavLink activeClassName='nav-link-active' to='/kartta'>
              <li>
                <i className='material-icons-round'>map</i>
                {maxWidth500 ? '' : 'Kartta'}
              </li>
            </NavLink>
          </ul>
        </nav>
        <Tooltip
          overlayStyle={{ visibility: isMobile ? 'hidden' : 'visible' }}
          mouseLeaveDelay={0}
          placement='bottomRight'
          title='Vaihda teema'>
          <div className='theme-toggle-btn'>
            <i
              className='material-icons-round'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              invert_colors
            </i>
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
