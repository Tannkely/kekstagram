import { showBigPicture } from './big-pictures.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();
const bodyOff = document.querySelector('body');

const drawUsersPictures = (images) => {
  images.forEach(({ id, url, likes, comments }) => {
    const pictureLinkClone = picture.cloneNode(true);

    pictureLinkClone.querySelector('a').id = `image${id}`;
    pictureLinkClone.querySelector('.picture__img').src = url;
    pictureLinkClone.querySelector('.picture__likes').textContent = likes;
    pictureLinkClone.querySelector('.picture__comments').textContent =
      comments.length;
    picturesFragment.appendChild(pictureLinkClone);
  });

  pictures.appendChild(picturesFragment);

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      const image = images.find(
        (element) => `image${element.id}` === pictureElement.id,
      );
      showBigPicture(image);

      bodyOff.classList.add('modal-open');
    }
  });
};

export { drawUsersPictures };
