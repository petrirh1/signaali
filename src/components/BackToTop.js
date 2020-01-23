import React from 'react';
import BackTop from 'antd/es/back-top';
import './css/back-to-top.css';

const BackToTop = () => {
  return (
    <BackTop>
      <div className='ant-back-top-inner'>
        <i className='material-icons-round'>arrow_upward</i>
      </div>
    </BackTop>
  );
};

export default BackToTop;
