import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/es/modal';
import 'antd/dist/antd.css';
import './css/info-modal.css';

const InfoModal = ({ title, description, okText }) => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={showModal} className='info-popup-button' tabIndex='0'>
        <i className='material-icons-round'>info</i>
      </button>
      <Modal
        title={title}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleOk}
        closable={false}
        okText={okText}
        centered
        cancelButtonProps={{ style: { display: 'none' } }}>
        <p>{description}</p>
      </Modal>
    </div>
  );
};

export default InfoModal;

InfoModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  okText: PropTypes.string
};
