import React, { useState, useContext } from 'react';
import ReactMapGL, { Source, Layer, Popup, LinearInterpolator } from 'react-map-gl';
import { ThemeContext } from './ThemeContext';
import GeoJSON from 'geojson';
import './css/map.css';

const Map = ({ data, component }) => {
  const [theme] = useContext(ThemeContext);
  const [popupInfo, setPopupInfo] = useState({
    title: '',
    description: '',
    date: '',
    latitude: '',
    longitude: '',
    isVisible: false
  });
  const [viewport, setViewport] = useState({
    latitude: 65.272,
    longitude: 25.826,
    zoom: 4,
    minZoom: 2
  });

  const geoJSON = GeoJSON.parse(data, {
    Point: ['latitude', 'longitude'],
    include: ['title', 'type', 'description', 'date', 'latitude', 'longitude']
  });

  const handleViewportChange = viewport => {
    setViewport(viewport);
  };

  const handlePopupClose = () => {
    setPopupInfo({ ...popupInfo, isVisible: false });
  };

  const handleClick = ({ features }) => {
    if (!features.length) {
      handlePopupClose();
      return;
    }

    const { properties } = features[0];
    const { title, description, date, latitude, longitude } = properties;

    if (properties !== undefined && latitude !== undefined && longitude !== undefined) {
      setPopupInfo({
        title,
        description,
        date,
        latitude,
        longitude,
        isVisible: true
      });

      centerTo(latitude, longitude);
    }
    return;
  };

  const handleCursor = ({ isHovering, isDragging }) => {
    return isHovering ? 'pointer' : 'default';
  };

  const centerTo = (latitude, longitude) => {
    const loc = {
      ...viewport,
      longitude,
      latitude,
      transitionDuration: 250,
      transitionInterpolator: new LinearInterpolator()
    };
    setViewport(loc);
  };

  const { title, description, date, latitude, longitude, isVisible } = popupInfo;

  return (
    <ReactMapGL
      {...viewport}
      width={'100vw'}
      height={'100vh'}
      doubleClickZoom={false}
      dragRotate={false}
      onClick={handleClick}
      getCursor={handleCursor}
      interactiveLayerIds={['point']}
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken='pk.eyJ1IjoicGV0cmlyaDEiLCJhIjoiY2s0aWRpaHFmMWUxYzNubnA2ZmtlYmh2ZCJ9.C46dtWtud1yttEtebVr2dA'
      mapStyle={
        theme === 'dark'
          ? 'mapbox://styles/petrirh1/ck4o4q5ib09541fjzqit8lpy1'
          : 'mapbox://styles/petrirh1/ck4pnjtrwaodx1cmixukicu6w'
      }>
      <Source id='alert' type='geojson' data={geoJSON}>
        <Layer
          id='point'
          type='symbol'
          layout={{
            'icon-image': [
              'match',
              ['get', 'type'],
              'palohälytys',
              'alarm',
              'tulipalo',
              'fire',
              'vahingontorjunta',
              'nature',
              'tieliikenneonnettomuus',
              'car',
              'vesiliikenneonnettomuus',
              'boat',
              'raideliikenneonnettomuus',
              'train',
              'ilmaliikenneonnettomuus',
              'aeroplane',
              'ensivastetehtävä',
              'heal',
              'ihmisen pelastaminen',
              'people',
              'eläimen pelastaminen',
              'pets',
              'vaarallisen aineen onnettomuus',
              'warning-2',
              'öljyvahinko',
              'oil',
              'warning'
            ]
          }}
        />
      </Source>
      {isVisible && (
        <Popup
          tipSize={10}
          latitude={latitude}
          longitude={longitude}
          offsetTop={-12}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={false}
          onClose={handlePopupClose}
          anchor='bottom'>
          <div>
            <h3 className='popup-alert-title'>{title}</h3>
            <p className='popup-alert-description'>{description}</p>
            <p className='popup-alert-date'>{date}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
