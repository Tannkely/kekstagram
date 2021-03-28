import { showAlert } from './util.js';
import { closeModal } from './editor.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const FILE_SIZE = 1000000;

const fileUpload = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const loadUserPhoto = () => {
  fileUpload.addEventListener('change', () => {
    const imgFile = fileUpload.files[0];
    const imgFileName = imgFile.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return imgFileName.endsWith(it);
    });

    if (!/\.(jpe?g|png|gif)$/i.test(fileUpload.files[0].name)) {
      showAlert('Это не картинка, попробуйте ещё раз');
      closeModal();
    }

    if (fileUpload.files[0].size > FILE_SIZE) {
      showAlert('Картинка весит больше 1 МБ. Выберите другую');
      closeModal();
    }

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(imgFile);
    }
  });
};
loadUserPhoto();
