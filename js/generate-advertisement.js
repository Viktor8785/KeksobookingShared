//import {nearestEstates} from './create-advertisement.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

function generateAdvertisement(nearestEstates) {
  const advs = [];
  nearestEstates.forEach((estate) => {
    const popupElement = popupTemplate.cloneNode(true);
    popupElement.querySelector('.popup__title').textContent = estate.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = estate.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = `${estate.offer.price} Р/ночь`;
    popupElement.querySelector('.popup__type').textContent = getEstateType(estate.offer.type);
    popupElement.querySelector('.popup__text--capacity').textContent = `${estate.offer.rooms} комнаты для ${estate.offer.guests} гостей`;
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${estate.offer.checkin}, выезд до ${estate.offer.checkout}`;
    removeFeatures(estate, popupElement);
    popupElement.querySelector('.popup__description').textContent = estate.offer.description;
    addPhotos(estate, popupElement);
    popupElement.querySelector('.popup__avatar').src = estate.author.avatar;
    advs.push(popupElement);
  });
  return advs;
}

function getEstateType(type) {
  switch (type) {
    default: {
      return 'Квартира';
    }
    case 'flat': {
      return 'Квартира';
    }
    case 'bungalow': {
      return 'Бунгало';
    }
    case 'house': {
      return 'Дом';
    }
    case 'palace': {
      return 'Дворец';
    }
  }
}

function removeFeatures(estate, popupElement) {
  const popupFeatures = popupElement.querySelector('.popup__features');

  if(!estate.offer.features) {
    popupFeatures.parentElement.removeChild(popupFeatures);
    return;
  }
  if(estate.offer.features.indexOf('wifi') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--wifi'));
  }
  if(estate.offer.features.indexOf('dishwasher') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--dishwasher'));
  }
  if(estate.offer.features.indexOf('parking') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--parking'));
  }
  if(estate.offer.features.indexOf('washer') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--washer'));
  }
  if(estate.offer.features.indexOf('elevator') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--elevator'));
  }
  if(estate.offer.features.indexOf('conditioner') < 0) {
    popupFeatures.removeChild(popupFeatures.querySelector('.popup__feature--conditioner'));
  }
}

function addPhotos(estate, popupElement) {
  const popupPhotos = popupElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  if(!estate.offer.photos) {
    popupPhotos.parentElement.removeChild(popupPhotos);
    return;
  }
  estate.offer.photos.forEach((photo, index) => {
    if(index === 0) {
      popupPhoto.src = photo;
    } else {
      const popupPhotoNew = popupPhoto.cloneNode();
      popupPhotoNew.src = photo;
      popupPhotos.appendChild(popupPhotoNew);
    }
  });
}

export {generateAdvertisement};
