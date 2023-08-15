import {getRandomInteger, getRandomFloat} from './get-random.js';

const TYPES_OF_ESTATE = ['palace', 'house', 'flat', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const DESCRIPTION = 'Big kitchen';
const TITLE = 'Wonderfull advertisement!';
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
const MIN_X = 35.65;
const MAX_X = 35.7;
const MIN_Y = 139.7;
const MAX_Y = 139.8;
const PRECISION = 5;

const createAvatarPhoto = function(min, max) {
  const addressNumber = getRandomInteger(min, max);
  if(addressNumber < 10) {
    return `img/avatars/user0${addressNumber}.png`;
  }
  return `img/avatars/user${addressNumber}.png`;
};

const createRandomLengthArray = function(array) {
  const arrayLength = getRandomInteger(1, array.length);
  const set = new Set();
  while(set.size < arrayLength) {
    set.add(array[getRandomInteger(0, array.length - 1)]);
  }
  return Array.from(set);
};

const createAdvertisement = function() {
  const locationX = getRandomFloat(MIN_X, MAX_X, PRECISION);
  const locationY = getRandomFloat(MIN_Y, MAX_Y, PRECISION);
  return {
    author: {
      avatar: createAvatarPhoto(1, 10),
    },
    offer: {
      title: TITLE,
      address: `${locationX}, ${locationY}`,
      price: 10,
      type: TYPES_OF_ESTATE[getRandomInteger(0, TYPES_OF_ESTATE.length - 1)],
      rooms: 3,
      guests: 6,
      checkin: CHECKIN[getRandomInteger(0, CHECKIN.length - 1)],
      checkout: CHECKIN[getRandomInteger(0, CHECKIN.length - 1)],
      features: createRandomLengthArray(FEATURES),
      description: DESCRIPTION,
      photos: createRandomLengthArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const nearestEstates = new Array(10).fill(null).map(() => createAdvertisement());

export {nearestEstates};
