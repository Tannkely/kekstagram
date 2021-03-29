import {changeViewMode} from './sort.js';
import {showBigPicture} from './big-pictures.js';
import {showUploadImage} from './upload-img.js';
import {initValidator} from './validation.js';

const RERENDER_DELAY = 500;

const previewPictureListContainer = document.querySelector('.pictures');
const defaultPictureListContainerInnerHtml = previewPictureListContainer.innerHTML;

const onModeButtonClick = (buttonID) => {
  document.querySelectorAll('.img-filters__button').forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  document.querySelector('#' + buttonID).classList.add('img-filters__button--active');
  renderImages(changeViewMode(buttonID));
}

const debounceRender = _.debounce((buttonID) => onModeButtonClick(buttonID), RERENDER_DELAY);

const initSortMode = () => {
  document.querySelectorAll('.img-filters__button').forEach((filterButton) => {
    filterButton.addEventListener('click', () => { debounceRender(filterButton.id); });
  });
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

const renderImages = (imagesForRender) => new Promise((resolve) => {
  const previewPictureTemplate = document.querySelector('#picture').content;
  const previewPictureListFragment = document.createDocumentFragment();
  imagesForRender.forEach((picture) => {
    const previewPictureOneElement = previewPictureTemplate.cloneNode(true);
    previewPictureOneElement.querySelector('.picture').id = picture.id;
    previewPictureOneElement.querySelector('.picture__likes').textContent = picture.likes;
    previewPictureOneElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
    previewPictureOneElement.querySelector('.picture__img').src = picture.url;
    previewPictureOneElement.querySelector('.picture__img').alt = picture.description;
    const picObj = previewPictureOneElement.querySelector('.picture') ;
    picObj.addEventListener('click',() => { showBigPicture(picture); })
    previewPictureListFragment.appendChild(previewPictureOneElement);
  })
  previewPictureListContainer.innerHTML = defaultPictureListContainerInnerHtml;
  previewPictureListContainer.appendChild(previewPictureListFragment);
  previewPictureListContainer.querySelector('#upload-file').addEventListener( 'change', () => {
    showUploadImage();
  });
  initValidator();
  resolve(imagesForRender);
});

export {initSortMode, renderImages};
