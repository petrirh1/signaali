import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from './ThemeContext';
import './css/loader.css';

const Loader = ({ data, index }) => {
  const [theme] = useContext(ThemeContext);
  let color = theme === 'dark' ? '#25262A' : '#DCDCDC';
  let highlightColor = theme === 'dark' ? '#202024' : '#CFCFCF';

  return (
    <div className='skeleton-container' style={{ border: `5px solid ${color}` }}>
      <SkeletonTheme color={color} highlightColor={highlightColor}>
        <div className='skeleton-content'>
          <div className='skeleton-icon--placeholder'>
            <Skeleton circle={true} height={50} width={50} />
          </div>
          <Skeleton count={3} data={data} key={`skeleton-${index}`} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loader;
