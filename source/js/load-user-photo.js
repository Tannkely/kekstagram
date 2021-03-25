import { showAlert } from './util.js';
import { closeModal } from './editor.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileUpload = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const loadUserPhoto = () => {
  fileUpload.addEventListener('change', () => {
    const imgFile = fileUpload.files[0];
    const imgFileName = imgFile.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return imgFileName.endsWith(it);
    });

    if (/\.(jpe?g|png|gif)$/i.test(fileUpload.files[0].name) === false) {
      showAlert('Это не картинка, попробуйте снова');
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
