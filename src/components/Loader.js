import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from './ThemeContext';
import PropTypes from 'prop-types';
import './css/loader.css';

const Loader = ({ data, index }) => {
  const [theme] = useContext(ThemeContext);
  let color = theme === 'dark' ? '#2b2c31' : '#d8d8d8';
  let highlightColor = theme === 'dark' ? '#24252a' : '#cccccc';

  return (
    <div className='skeleton-container' style={{ border: `5px solid ${color}` }}>
      <SkeletonTheme color={color} highlightColor={highlightColor}>
        <div className='skeleton-content'>
          <div className='skeleton-icon--placeholder'>
            <Skeleton circle={true} height={30} width={30} />
          </div>
          <Skeleton count={3} data={data} key={`skeleton-${index}`} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  data: PropTypes.array,
  index: PropTypes.number
};
