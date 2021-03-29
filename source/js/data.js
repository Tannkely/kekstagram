const loadServerData = new Promise((resolve, reject) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      resolve(photos);
    })
    .catch((err) => {
      reject(err);
    });
});

const sendDataOnServer = (onSuccess, onFail, formData) => {
  fetch('https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    });
};

export {loadServerData, sendDataOnServer};
