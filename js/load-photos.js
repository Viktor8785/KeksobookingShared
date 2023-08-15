import {validateFileType} from './validate.js';

const avatarInput = document.querySelector('#avatar');
const avatarImg = document.querySelector('#avatar-img');
const photoInput = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo');
let photoNumber = 0;

function setupLoadPhotos() {
  loadAvatar(avatarInput, avatarImg);
  loadPhoto(photoInput, photoContainer);
}

function loadAvatar(input, photo) {
  input.addEventListener('change', () => {
    const file = input.files[0];
    if(!validateFileType(file.name)) {
      input.setCustomValidity('Допустимы только типы файлов "jpg" и "png"');
      input.reportValidity();
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photo.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

function loadPhoto(input, container) {
  input.addEventListener('change', () => {
    if(photoNumber > 2) {
      return;
    }
    const file = input.files[0];
    if(!validateFileType(file.name)) {
      input.setCustomValidity('Допустимы только типы файлов "jpg" и "png"');
      input.reportValidity();
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const photo = document.createElement('img');
      photo.width = '40';
      photo.height = '44';
      photo.style.marginRight = '5px';
      photo.alt = 'Фото жилья';
      photo.src = reader.result;
      container.appendChild(photo);
      photoNumber++;
    });
    reader.readAsDataURL(file);
  });
}

export {setupLoadPhotos};
