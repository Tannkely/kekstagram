import './data.js';
import generateObjectsArray from './data.js';

const usersPictures = document.querySelector('.pictures');
const pictureTemplateFragmet = document.querySelector('#picture').content.querySelector('.picture');
const usersComments = pictureTemplateFragmet.querySelector('.picture__comments');
const usersLikes = pictureTemplateFragmet.querySelector('.picture__likes');

const createUsersImages = function ({url, comments, likes}) {
  const usersImages = pictureTemplateFragmet.cloneNode(true);
  usersImages.querySelector('.picture__img').src = url;
  usersComments.textContent = comments.length;
  usersLikes.textContent = likes;

  return usersImages;
};

const renderUsersImages = function () {
  const fragment = document.createDocumentFragment();
  generateObjectsArray().forEach((item) => {
    fragment.appendChild(createUsersImages(item));
  });

  usersPictures.appendChild(fragment)

};


renderUsersImages();
