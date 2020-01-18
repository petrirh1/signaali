import { removeWordsAfterSlash, removeWordsAfterLastNumber } from './string';
import setAlertType from './alert';
import getCoordinates from './coordinates';

const parseData = item => {
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

export default parseData;
