import objectsArray from './data.js';

const getPictureElement = document.querySelector('.pictures');
const pictureTemplateFragmet = document.querySelector('#picture').content.querySelector('.picture');
const usersComments = pictureTemplateFragmet.querySelector('.picture_comments');
const usersLikes = pictureTemplateFragmet.querySelector('.picture_likes');

const pictureElement = function ({url, comments, likes}) {
  const usersImages = pictureTemplateFragmet.cloneNode(true);
  usersImages.querySelector('.picture__img').src = url;
  usersComments.textContent = comments;
  usersLikes.textContent = likes;

  return usersImages;
};

const renderUsersImages = function () {
  const fragment = document.createDocumentFragment();
  objectsArray.forEach((item) => {
    fragment.appendChild(pictureElement(item));
  });

  getPictureElement.appendChild(fragment)

};

export default renderUsersImages;
