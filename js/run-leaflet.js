/* global L:readonly */
import { startLat, startLng, initializeForms } from './setup.js';
import { showLoadingMap, removeLoadingMap } from './messages.js';

const currentAddress = document.querySelector('#address');
const markers = [];
let mainMarker;
let mapMap;

function runLeaflet(div) {
  return new Promise((resolve) => {
    let errNumber = 0;
    let loadStartNumber = 0;
    let loadNumber = 0;

    const map = L.map(div);
    mapMap = map;
    map.on('load', () => {
      initializeForms();
      createMainMarker(map);
      resolve(map);
    });
    map.setView({
      lat: startLat,
      lng: startLng,
    }, 10);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )
      .on('tileloadstart', () => {
        if(loadStartNumber === 0) {
          console.log(loadStartNumber);
          showLoadingMap('Загрузка карты...');
          loadStartNumber++;
        }
      })
      .on('tileerror',() => {
        if(errNumber === 0) {
          removeLoadingMap();
          showLoadingMap('Ошибка загрузки карты');
          errNumber++;
        }
      })
      .on('load', () => {
        if(errNumber === 0 && loadNumber === 0) {
          loadNumber++;
          removeLoadingMap();
        }
      })
      .addTo(map);
  });
}

function createMarkers(nearestEstates, template) {
  nearestEstates.forEach((estate, index) => {
    if(index > 9) {
      return;
    }
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker([estate.location.lat, estate.location.lng],
      {icon: icon},
    );
    markers.push(marker);
    marker.addTo(mapMap).bindPopup(template[index]);
  });
}

function deleteAllMarkers(map) {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
}

function createMainMarker() {
  const icon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker([startLat, startLng],
    {
      draggable: true,
      icon: icon
    },
  );
  mainMarker = marker;
  marker.on('moveend', (evt) => {
    changeAddress(evt.target.getLatLng());
  }).addTo(mapMap);
}

function deleteMainMarker() {
  mapMap.removeLayer(mainMarker);
}

function changeAddress(coords) {
  const currentLat = Math.round(coords.lat * 100000) / 100000;
  const currentLng = Math.round(coords.lng * 100000) / 100000;
  currentAddress.value = `${currentLat}, ${currentLng}`;
}

export {runLeaflet, createMarkers, deleteAllMarkers, createMainMarker, deleteMainMarker};
