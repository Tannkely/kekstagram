import generateObjectsArray from './data.js';

const getPictureElement = document.querySelector('.pictures');
const pictureTemplateFragmet = document.querySelector('#picture').content.querySelector('.picture');
const usersComments = pictureTemplateFragmet.querySelector('.picture__comments');
const usersLikes = pictureTemplateFragmet.querySelector('.picture__likes');

const pictureElement = function ({url, comments, likes}) {
  const usersImages = pictureTemplateFragmet.cloneNode(true);
  usersImages.querySelector('.picture__img').src = url;
  usersComments.textContent = comments.length;
  usersLikes.textContent = likes;

  return usersImages;
};

const renderUsersImages = function () {
  const fragment = document.createDocumentFragment();
  generateObjectsArray().forEach((item) => {
    fragment.appendChild(pictureElement(item));
  });

  getPictureElement.appendChild(fragment)

};


renderUsersImages();
