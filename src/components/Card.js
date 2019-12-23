import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { Modal } from 'antd';
import ReactMapGL from 'react-map-gl';
import 'antd/dist/antd.css';
import './css/card.css';

const Alert = ({ data }) => {
  const [theme] = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const low = theme === 'dark' ? '#67696E' : '#AAAAAA';
  const medium = theme === 'dark' ? '#FFD160' : '#FEC230';
  const high = theme === 'dark' ? '#FF5F54' : '#FE6D63';
  const lowBG = theme === 'dark' ? '#25262A' : '#F5F5F5';
  const mediumBG = theme === 'dark' ? '#262622' : '#FFF4D9';
  const highBG = theme === 'dark' ? '#262224' : '#FFEFEE';
  const mapLight = process.env.REACT_APP_MAP_STYLE_LIGHT;
  const mapDark = process.env.REACT_APP_MAP_STYLE_DARK;

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 63.095141,
    longitude: 21.616513,
    zoom: 11
  });

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

  useEffect(() => {
    document.addEventListener('keyup', closeModalOnEscape);
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const closeModalOnEscape = e => {
    e.preventDefault();
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };

  return (
    <>
      <div className='alert-card' onClick={showModal}>
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
      <Modal
        centered
        width={'80vw'}
        className='modal-window'
        title={removeAfterSlash(data.title[0])}
        closable={false}
        visible={modalVisible}
        okText={'Sulje'}
        onOk={handleModalClose}
        maskClosable={false}
        cancelButtonProps={{ style: { display: 'none' } }}>
        <ReactMapGL
          {...viewport}
          mapStyle={theme === 'dark' ? mapDark : mapLight}
          // onViewportChange={viewport => setViewport(viewport)}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
      </Modal>
    </>
  );
};

export default Alert;
