import { createMarkers, deleteAllMarkers } from './run-leaflet.js';
import { generateAdvertisement } from './generate-advertisement.js';
import { debounce } from './debounce.js';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFilter = document.querySelectorAll('.map__filter');
const filterWifi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterParking = document.querySelector('#filter-parking');
const filterWasher = document.querySelector('#filter-washer');
const filterElevator = document.querySelector('#filter-elevator');
const filterConditioner = document.querySelector('#filter-conditioner');
const mapCheckbox = document.querySelectorAll('.map__checkbox');

function applyFilters(nearestEstates, map) {
  const nearestEstatesCopy = [];
  Object.assign(nearestEstatesCopy, nearestEstates);

  mapFilter.forEach((filter) => {
    filterEstates(filter);
  });

  mapCheckbox.forEach((filter) => {
    filterEstates(filter);
  });

  function filterEstates(filter) {
    filter.addEventListener('change', debounce(renderMarkers, 500));
  }

  function renderMarkers() {
    const estates = getFilteredData(nearestEstatesCopy);
    const advs = generateAdvertisement(estates);
    deleteAllMarkers(map);
    createMarkers(estates, advs, map);
  }
}

function getFilteredData(nearestEstatesCopy) {
  return nearestEstatesCopy
    .filter((estate) => {
      if(housingType.value === 'any') {
        return true;
      }
      return housingType.value === estate.offer.type;
    })
    .filter((estate) => {
      switch(housingPrice.value) {
        case 'any':
          return true;
        case 'low':
          return estate.offer.price < 10000;
        case 'middle':
          return estate.offer.price > 10000 && estate.offer.price <= 50000;
        case 'high':
          return estate.offer.price > 50000;
      }
    })
    .filter((estate) => {
      switch(housingRooms.value) {
        case 'any':
          return true;
        case '1':
          return estate.offer.rooms === 1;
        case '2':
          return estate.offer.rooms === 2;
        case '3':
          return estate.offer.rooms === 3;
      }
    })
    .filter((estate) => {
      switch(housingGuests.value) {
        case 'any':
          return true;
        case '0':
          return estate.offer.guests === 0;
        case '1':
          return estate.offer.guests === 1;
        case '2':
          return estate.offer.guests === 2;
        case '3':
          return estate.offer.guests === 3;
      }
    })
    .filter((estate) => {
      if(!filterWifi.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterWifi.value);
    })
    .filter((estate) => {
      if(!filterDishwasher.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterDishwasher.value);
    })
    .filter((estate) => {
      if(!filterParking.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterParking.value);
    })
    .filter((estate) => {
      if(!filterWasher.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterWasher.value);
    })
    .filter((estate) => {
      if(!filterElevator.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterElevator.value);
    })
    .filter((estate) => {
      if(!filterConditioner.checked) {
        return true;
      }
      if(!estate.offer.features) {
        return false;
      }
      return estate.offer.features.includes(filterConditioner.value);
    });
}

export {applyFilters};
