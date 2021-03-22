const picture = document.querySelector('#picture');
const pictures = document.querySelector('.pictures');
import { setClickEvts, setData } from './big-pictures.js';

const drawUsersPictures = (allUsers) => {
  for (let i = 0; i < allUsers.length; i++) {
    const pictureLinkClone = picture.content.cloneNode(true);
    const pictureImage = pictureLinkClone.querySelector('.picture__img');
    const pictureInfo = pictureLinkClone.querySelector('.picture__info');
    const pictureComments = pictureInfo.querySelector('.picture__comments');
    const pictureLikes = pictureInfo.querySelector('.picture__likes');

    pictureImage.setAttribute('src', allUsers[i].url);
    pictureImage.setAttribute('id', 'pim-' + allUsers[i].id);
    pictureInfo.setAttribute('id', 'pin-' + allUsers[i].id);
    pictureComments.setAttribute('id', 'pli-' + allUsers[i].id);
    pictureLikes.setAttribute('id', 'pco-' + allUsers[i].id);
    pictureImage.setAttribute('alt', allUsers[i].description);
    pictureLikes.textContent = allUsers[i].likes;
    pictureComments.textContent = allUsers[i].comments.length;
    pictures.appendChild(pictureLinkClone);
  }
  setData(allUsers);
  setClickEvts();
};

export { pictures, drawUsersPictures };
