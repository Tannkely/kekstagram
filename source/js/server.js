import {SERVER_GET_URL, SERVER_SEND_URL} from './constants.js';

const sendServerData = (body) => {
  return fetch(
    SERVER_SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    })
};

const getServerData = () => {
  return fetch(SERVER_GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        Promise.reject(`${response.status} ${response.statusText}`);
      }
    })
};

export {getServerData, sendServerData};
