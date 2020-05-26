import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, {
	Source,
	Layer,
	Popup,
	LinearInterpolator
} from 'react-map-gl';
import { ThemeContext } from './ThemeContext';
import InfoModal from './InfoModal';
import GeoJSON from 'geojson';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Fade from './Fade';
import './css/map.css';

const Map = ({ data, location }) => {
	document.title = 'Signaali - Kartta';

	const initialViewport = {
		latitude: 65.272,
		longitude: 25.826,
		zoom: 4,
		minZoom: 2
	};
	const initialPopupInfo = {
		title: '',
		description: '',
		date: '',
		latitude: '',
		longitude: '',
		isVisible: false
	};

	const accessToken =
		'pk.eyJ1IjoicGV0cmlyaDEiLCJhIjoiY2s0aWRpaHFmMWUxYzNubnA2ZmtlYmh2ZCJ9.C46dtWtud1yttEtebVr2dA';
	const lightTheme = 'mapbox://styles/petrirh1/ck4pnjtrwaodx1cmixukicu6w';
	const darkTheme = 'mapbox://styles/petrirh1/ck4o4q5ib09541fjzqit8lpy1';
	const transitionDuration = 145;
	const [theme] = useContext(ThemeContext);
	const [isLoading, setLoading] = useState(true);
	const [popupInfo, setPopupInfo] = useState(initialPopupInfo);
	const [viewport, setViewport] = useState(initialViewport);

	useEffect(() => {
		window.scrollTo(0, 0);

		if (location.state == null) {
			setViewport(initialViewport);
			return;
		}

		const { latitude, longitude } = location.state.data;
		setPopupInfo({ ...location.state.data, isVisible: true });
		centerTo(latitude, longitude, 14.2, 0);

		// reset map view on browser refresh when location.state not null
		window.history.replaceState(null, null, location.state.path);

		// eslint-disable-next-line
	}, []);

	const geoJSON = GeoJSON.parse(data, {
		Point: ['latitude', 'longitude'],
		include: [
			'title',
			'type',
			'severity',
			'description',
			'date',
			'latitude',
			'longitude'
		]
	});

	const handleOnLoad = () => {
		// setPopupInfo({ ...popupInfo, isVisible: true });
		setLoading(false);
	};

	const handleCursor = ({ isHovering }) => {
		return isHovering ? 'pointer' : 'default';
	};

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

		if (date == popupInfo.date && popupInfo.isVisible) {
			handlePopupClose();
			return;
		}

		if (
			!isLoading &&
			properties !== undefined &&
			latitude !== undefined &&
			longitude !== undefined
		) {
			handlePopupClose();

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

	const centerTo = (
		latitude,
		longitude,
		zoom = viewport.zoom,
		duration = transitionDuration
	) => {
		const loc = {
			...viewport,
			longitude,
			latitude,
			zoom,
			transitionDuration: duration,
			transitionInterpolator: new LinearInterpolator()
		};
		setViewport(loc);
	};

	const {
		title,
		description,
		date,
		latitude,
		longitude,
		isVisible
	} = popupInfo;

	return (
		<>
			<InfoModal
				title='Huom!'
				description='Hälytykset sijoitetaan kartalle ainoastaan
        		paikkakunnan mukaan, joten sijainnit eivät ole tarkkoja.'
				okText='Sulje'
			/>
			<Spinner isVisible={isLoading} />
			<ReactMapGL
				{...viewport}
				width={'100vw'}
				height={'100vh'}
				onLoad={handleOnLoad}
				doubleClickZoom={false}
				dragRotate={false}
				onClick={handleClick}
				getCursor={handleCursor}
				clickRadius={2}
				interactiveLayerIds={['point']}
				onViewportChange={handleViewportChange}
				mapboxApiAccessToken={accessToken}
				mapStyle={theme === 'dark' ? darkTheme : lightTheme}>
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
								'pet',
								'vaarallisen aineen onnettomuus',
								'danger',
								'ympäristöonnettomuus',
								'oil',
								'warning'
							]
						}}
					/>
				</Source>
				(
				<Fade show={isVisible} isLoading={isLoading}>
					<Popup
						tipSize={7}
						latitude={latitude || 0}
						longitude={longitude || 0}
						offsetTop={-13}
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
				</Fade>
				)
			</ReactMapGL>
		</>
	);
};

export default Map;

Map.propTypes = {
	data: PropTypes.array,
	location: PropTypes.object
};
