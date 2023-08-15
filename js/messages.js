const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');
const map = document.querySelector('.map');

let loadingMessage;
let loadingMap;

function showMessage(status) {
  let popupElement;
  popupElement = popupErrorTemplate.cloneNode(true);
  if(status === 'success') {
    popupElement = popupSuccessTemplate.cloneNode(true);
  }
  const child = main.appendChild(popupElement);
  child.addEventListener('click', () => {
    if(main.contains(child)) {
      main.removeChild(child);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      if(main.contains(child)) {
        main.removeChild(child);
      }
    }
  });
}

function showLoadingMessage(textContent) {
  loadingMessage = document.createElement('p');
  loadingMessage.style.position = 'absolute';
  loadingMessage.style.width = '300px';
  loadingMessage.style.padding = '10px';
  loadingMessage.style.top = '50%';
  loadingMessage.style.left = 'calc(50% - 150px)';
  loadingMessage.textContent = textContent;
  loadingMessage.style.color = '#000000';
  loadingMessage.style.zIndex = '1000';
  loadingMessage.style.backgroundColor = '#ffffff';
  loadingMessage.style.textAlign = 'center';
  map.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  map.removeChild(loadingMessage);
}

function showLoadingMap(textContent) {
  loadingMap = document.createElement('p');
  loadingMap.style.position = 'absolute';
  loadingMap.style.width = '300px';
  loadingMap.style.padding = '10px';
  loadingMap.style.top = 'calc(50% - 50px)';
  loadingMap.style.left = 'calc(50% - 150px)';
  loadingMap.textContent = textContent;
  loadingMap.style.color = '#000000';
  loadingMap.style.zIndex = '1000';
  loadingMap.style.backgroundColor = '#ffffff';
  loadingMap.style.textAlign = 'center';
  map.appendChild(loadingMap);
}

function removeLoadingMap() {
  map.removeChild(loadingMap);
}

export {showMessage, showLoadingMessage, removeLoadingMessage,
  showLoadingMap, removeLoadingMap};
