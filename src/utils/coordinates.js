import { listOfCoordinates } from './listOfCoordinates';
const locations = [];

const getCoordinates = location => {
	let lat, long;

	const newLocation = location.split('/')[0];
	const temp = listOfCoordinates.find(v => v.municipality === newLocation);

	if (!locations.includes(newLocation)) {
		locations.push(newLocation);
	}

	// scatter alerts across location
	if (locations.includes(newLocation)) {
		lat = temp.latitude + (Math.random() * (9999 + 1)) / 1000000;
		long = temp.longitude - (Math.random() * (19999 + 1)) / 1000000;
	} else {
		lat = temp.latitude;
		long = temp.longitude;
	}

	return [lat, long];
};

export default getCoordinates;
