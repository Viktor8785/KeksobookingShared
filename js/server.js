const SERVER_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_POST = 'https://23.javascript.pages.academy/keksobooking';

const getData = fetch(SERVER_GET)
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else if(response.status === 404) {
      return null;
    }
    throw new Error(`Неизвестный статус ${response.status} ${response.statusText}`);
  });

function sendData(formData) {
  return fetch(SERVER_POST, {
    method: 'POST',
    body: formData,
  });
}

export {getData, sendData};
