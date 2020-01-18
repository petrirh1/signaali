import { listOfCoordinates } from './listOfCoordinates';
const locations = [];

const getCoordinates = location => {
  let lat, long;

  const newLocation = location.split('/')[0];
  const temp = listOfCoordinates.filter(v => v.municipality === newLocation)[0];

  if (!locations.includes(newLocation)) {
    locations.push(newLocation);
  }

  // scatter alerts across location
  if (locations.includes(newLocation)) {
    lat = temp.latitude + (Math.random() * (10000 + 1)) / 1000000;
    long = temp.longitude - (Math.random() * (10000 + 1)) / 1000000;
  } else {
    lat = temp.latitude;
    long = temp.longitude;
  }

  return [lat, long];
};

export default getCoordinates;
