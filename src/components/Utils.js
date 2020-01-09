import { coordinates } from './Coordinates';
const locations = [];

export const parseData = item => {
  console.log(item);
  const newItem = item.map(v => ({
    title: removeWordsAfterSlash(v.title[0])[0],
    type: setAlertType(v.title[0]),
    description: removeWordsAfterSlash(v.title[0])[1],
    date: removeWordsAfterLastNumber(v.description[0]),
    latitude: getCoordinates(v.title[0])[0],
    longitude: getCoordinates(v.title[0])[1]
  }));

  return newItem;
};

const removeWordsAfterSlash = sentence => {
  const result = sentence.replace(/\/.*?,/, ',').split(',');
  return result;
};

const removeWordsAfterLastNumber = sentence => {
  return sentence.replace(/\D+$/g, '');
};

const getCoordinates = location => {
  let lat, long;

  const newLocation = location.split('/')[0];
  const temp = coordinates.filter(v => v.municipality === newLocation)[0];

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

const setAlertType = sentence => {
  sentence = sentence.split(',')[1].toLowerCase();

  if (sentence.includes('hälytys')) {
    return 'palohälytys';
  } else if (sentence.includes('palo')) {
    return 'tulipalo';
  } else if (sentence.includes('vahingontorjunta')) {
    return 'vahingontorjunta';
  } else if (sentence.includes('tie')) {
    return 'tieliikenneonnettomuus';
  } else if (sentence.includes('vesi')) {
    return 'vesiliikenneonnettomuus';
  } else if (sentence.includes('raide')) {
    return 'raideliikenneonnettomuus';
  } else if (sentence.includes('ilma')) {
    return 'ilmaliikenneonnettomuus';
  } else if (sentence.includes('ensivaste')) {
    return 'ensivastetehtävä';
  } else if (sentence.includes('ihmisen')) {
    return 'ihmisen pelastaminen';
  } else if (sentence.includes('eläimen')) {
    return 'eläimen pelastaminen';
  } else if (sentence.includes('vaarallisen')) {
    return 'vaarallisen aineen onnettomuus';
  } else if (sentence.includes('öljy')) {
    return 'öljyvahinko';
  } else {
    return 'muu';
  }
};

export const setIcon = sentence => {
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
  } else if (sentence.includes('vesi') && !sentence.includes('öljy')) {
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
  } else if (sentence.includes('vaarallisen')) {
    return 'pan_tool';
  } else if (sentence.includes('öljy')) {
    return 'opacity';
  } else {
    return 'warning';
  }
};
