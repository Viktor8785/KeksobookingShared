import { getData } from './server.js';
import {generateAdvertisement} from './generate-advertisement.js';
import {setupValidation} from './validate.js';
import {setupCapacityAddress} from './setup.js';
import {runLeaflet, createMarkers} from './run-leaflet.js';
import {setupLoadPhotos} from './load-photos.js';
import {setupForm} from './form.js';
import { applyFilters } from './filter.js';
import { showLoadingMessage, removeLoadingMessage } from './messages.js';

const divMap = document.querySelector('#map-canvas');

setupValidation();
setupCapacityAddress();
setupLoadPhotos();
showLoadingMessage('Загрузка...');

runLeaflet(divMap)
  .then((map) => {
    getData
      .then((nearestEstates) => {
        const advs = generateAdvertisement(nearestEstates);
        createMarkers(nearestEstates, advs);
        applyFilters(nearestEstates, map);
        setupForm(nearestEstates, advs, map);
        removeLoadingMessage();
      })
      .catch((err) => {
        console.log(err);
        removeLoadingMessage();
        showLoadingMessage('Не удалось загрузить данные');
      });
  })
  .catch(() => {
    removeLoadingMessage();
    showLoadingMessage('Не удалось загрузить карту');
  });


