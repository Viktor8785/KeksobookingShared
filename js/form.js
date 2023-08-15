import { sendData } from './server.js';
import { showMessage } from './messages.js';
import { resetForms } from './setup.js';
import { createMainMarker, createMarkers, deleteAllMarkers, deleteMainMarker } from './run-leaflet.js';

const adForm = document.querySelector('.ad-form');
const adFormButtonSubmit = document.querySelector('.ad-form__submit');

const setupSubmit = function(nearestEstates, advs, map) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    adFormButtonSubmit.disabled = true;
    const formData = new FormData(adForm);
    sendData(formData)
      .then((data) => {
        if (data.ok) {
          showMessage('success');
          resetForms(createMainMarker, deleteMainMarker, deleteAllMarkers,
            createMarkers, nearestEstates, advs, map);
        } else {
          showMessage('error');
        }
      })
      .catch(() => {
        showMessage('error');
      })
      .finally(() => {
        adFormButtonSubmit.disabled = false;
      });
  });
};

const setupReset = function(nearestEstates, advs, map) {
  adForm.addEventListener('reset', (evt) => {
    evt.preventDefault();
    adFormButtonSubmit.disabled = true;
    resetForms(createMainMarker, deleteMainMarker, deleteAllMarkers,
      createMarkers, nearestEstates, advs, map);
    adFormButtonSubmit.disabled = false;
  });
};

const setupForm = function(nearestEstates, advs, map) {
  setupSubmit(nearestEstates, advs, map);
  setupReset(nearestEstates, advs, map);
};

export {setupForm};
