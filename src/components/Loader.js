import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from './ThemeContext';
import './css/skeleton.css';

const Loader = ({ data, index }) => {
  const [theme] = useContext(ThemeContext);
  let color = theme === 'dark' ? '#303133' : '#DCDCDC';
  let highlightColor = theme === 'dark' ? '#292A2B' : '#CFCFCF';

  return (
    <div className='skeleton-container' style={{ border: `5px solid ${color}` }}>
      <SkeletonTheme color={color} highlightColor={highlightColor}>
        <div className='skeleton-content'>
          <div className='skeleton-icon--placeholder'>
            <Skeleton circle={true} height={50} width={50} />
          </div>
          <Skeleton count={2} data={data} key={`skeleton-${index}`} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loader;
