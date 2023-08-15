const capacityValue = document.querySelector('#capacity');
const capacityOptions = capacityValue.querySelectorAll('option');
const startAddress = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapCheckbox = document.querySelectorAll('.map__checkbox');
const adFormTitle = document.querySelector('#title');
const adFormType = document.querySelector('#type');
const adFormPrice = document.querySelector('#price');
const adFormTimein = document.querySelector('#timein');
const adFormTimeout = document.querySelector('#timeout');
const adFormRoomNumber = document.querySelector('#room_number');
const adFormDescription = document.querySelector('#description');
const adFormCheckbox = document.querySelectorAll('.features__checkbox');
const avatarImg = document.querySelector('#avatar-img');
const adFormPhoto = document.querySelector('.ad-form__photo');

const startLat = '35.67500';
const startLng = '139.75000';

function setupCapacityAddress() {
  setStartCapacity();
  setStartAddress();
}

function setStartCapacity() {
  capacityOptions[0].disabled = true;
  capacityOptions[1].disabled = true;
  capacityOptions[2].disabled = false;
  capacityOptions[3].disabled = true;
}

function setStartAddress() {
  startAddress.value = `${startLat}, ${startLng}`;
}

function initializeForms() {
  mapFilters.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  housingType.disabled = false;
  housingPrice.disabled = false;
  housingRooms.disabled = false;
  housingGuests.disabled = false;
  housingFeatures.disabled = false;
  adFormHeader.disabled = false;
  adFormElement.forEach((element) => {
    element.disabled = false;
  });
}
function resetForms(createMainMarker, deleteMainMarker, deleteAllMarkers,
  createMarkers, nearestEstates, advs, map) {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';
  mapCheckbox.forEach((checkBox) => {
    checkBox.checked = false;
  });
  adFormTitle.value = '';
  adFormType.value = 'flat';
  adFormPrice.value = '';
  adFormPrice.placeholder = '1000';
  adFormTimein.value = '12:00';
  adFormTimeout.value = '12:00';
  adFormRoomNumber.value = '1';
  capacityValue.value = '1';
  adFormDescription.value = '';
  adFormCheckbox.forEach((checkBox) => {
    checkBox.checked = false;
  });
  deleteMainMarker();
  createMainMarker();
  setStartAddress();
  setStartCapacity();
  deleteAllMarkers(map);
  createMarkers(nearestEstates, advs);
  avatarImg.src = 'img/muffin-grey.svg';
  for(let i = adFormPhoto.children.length - 1; i >= 0; i--) {
    adFormPhoto.removeChild(adFormPhoto.children[i]);
  }
}

export {setStartCapacity, setStartAddress, startLat, startLng,
  initializeForms, setupCapacityAddress, resetForms};
