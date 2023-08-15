const estateTitle = document.querySelector('#title');
const estateType = document.querySelector('#type');
const estatePrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacityValue = document.querySelector('#capacity');
const capacityOptions = capacityValue.querySelectorAll('option');

function validateFileType(file) {
  if(file.endsWith('.jpg') || file.endsWith('.png')) {
    return true;
  }
  return false;
}

function setupValidation() {
  markInvalidItems();
  changeMinPrice();
  changetimeOut();
  changetimeIn();
  setCapacity();
}

function markInvalidItems() {
  estateTitle.addEventListener('invalid', () => {
    estateTitle.classList.add('ad-form__element--invalid');
  });
  estateTitle.addEventListener('input', () => {
    if(estateTitle.classList.contains('ad-form__element--invalid')) {
      estateTitle.classList.remove('ad-form__element--invalid');
    }
  });
  estatePrice.addEventListener('invalid', () => {
    estatePrice.classList.add('ad-form__element--invalid');
  });
  estatePrice.addEventListener('input', () => {
    if(estatePrice.classList.contains('ad-form__element--invalid')) {
      estatePrice.classList.remove('ad-form__element--invalid');
    }
  });
}

function changeMinPrice() {
  estateType.addEventListener('change', () => {
    switch (estateType.value) {
      case 'bungalow': {
        estatePrice.min = 0;
        estatePrice.placeholder = '0';
      }
        break;
      case 'flat': {
        estatePrice.min = 1000;
        estatePrice.placeholder = '1000';
      }
        break;
      case 'hotel': {
        estatePrice.min = 1000;
        estatePrice.placeholder = '1000';
      }
        break;
      case 'house': {
        estatePrice.min = 5000;
        estatePrice.placeholder = '5000';
      }
        break;
      case 'palace': {
        estatePrice.min = 10000;
        estatePrice.placeholder = '10000';
      }
        break;
    }
  });
}

function changetimeOut() {
  timeIn.addEventListener('change', () => {
    switch (timeIn.value) {
      case '12:00': {
        timeOut.value = '12:00';
      }
        break;
      case '13:00': {
        timeOut.value = '13:00';
      }
        break;
      case '14:00': {
        timeOut.value = '14:00';
      }
        break;
    }
  });
}

function changetimeIn() {
  timeOut.addEventListener('change', () => {
    switch (timeOut.value) {
      case '12:00': {
        timeIn.value = '12:00';
      }
        break;
      case '13:00': {
        timeIn.value = '13:00';
      }
        break;
      case '14:00': {
        timeIn.value = '14:00';
      }
        break;
    }
  });
}

function setCapacity() {
  roomNumber.addEventListener('change', () => {
    switch (roomNumber.value) {
      case '1': {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = true;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
        capacityValue.value = 1;
      }
        break;
      case '2': {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
        capacityValue.value = 1;
      }
        break;
      case '3': {
        capacityOptions[0].disabled = false;
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
        capacityValue.value = 1;
      }
        break;
      case '100': {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = true;
        capacityOptions[2].disabled = true;
        capacityOptions[3].disabled = false;
        capacityValue.value = 0;
      }
        break;
    }
  });
}

export {changeMinPrice, changetimeOut, changetimeIn, setCapacity,
  markInvalidItems, setupValidation, validateFileType};
