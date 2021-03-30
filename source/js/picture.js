import {openBigPhotosPopup} from './big-picture.js';
import {getServerData} from './server.js';
import {RANDOM_PHOTOS_QUANTITY, FILTER_DELAY} from './constants.js';
import {debounce} from './util.js';

const photosPool = document.querySelector('.pictures');
const picturePopupTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filtersBlock = document.querySelector('.img-filters');
const filterDiscussedButton = filtersBlock.querySelector('#filter-discussed');
const filterRandomButton = filtersBlock.querySelector('#filter-random');
const filterDefaultButton = filtersBlock.querySelector('#filter-default');

const renderPicture = (pictureData) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);

  picturePopup.querySelector('.picture__img').src = pictureData.url;
  picturePopup.querySelector('.picture__likes').textContent = pictureData.likes;
  picturePopup.querySelector('.picture__comments').textContent = pictureData.comments.length;
  picturePopup.addEventListener('click', openBigPhotosPopup(pictureData));

  return picturePopup;
};

const renderPictures = (dataList) => {
  const photosListFragment = document.createDocumentFragment();

  dataList.forEach((array) => {
    photosListFragment.appendChild(renderPicture(array));
  });

  photosPool.appendChild(photosListFragment);
};

const renderPicturesFromServer = () => {
  getServerData().then(
    (dataList) => {
      renderPictures(dataList);
      initFilters(dataList);
    },
  ).catch((error) => {
    alert(error);
  });
};

const initFilters = (dataList) => {
  const clonedPhotosList = dataList.slice(0);

  const handleFilter = debounce((filter) => {
    switch(filter) {
      case 'renderByDefault':
        return renderByDefault(dataList);
      case 'renderByDiscussed':
        return renderByDiscussed(clonedPhotosList);
      case 'renderByRandom':
        return renderByRandom(clonedPhotosList);
    }
  }, FILTER_DELAY);

  filtersBlock.classList.remove('img-filters--inactive');
  filterDefaultButton.addEventListener('click', () => {handleFilter('renderByDefault')});
  filterDiscussedButton.addEventListener('click', () => {handleFilter('renderByDiscussed')});
  filterRandomButton.addEventListener('click', () => {handleFilter('renderByRandom')});
};

const renderByDiscussed = (dataList) => {
  clearActiveFiltersClasses();
  filterDiscussedButton.classList.add('img-filters__button--active');
  clearPictures();
  renderPictures(sortByDiscussed(dataList));
};

const renderByDefault = (dataList) => {
  clearActiveFiltersClasses();
  filterDefaultButton.classList.add('img-filters__button--active');
  clearPictures();
  renderPictures(dataList);
};

const renderByRandom = (dataList) => {
  clearActiveFiltersClasses();
  filterRandomButton.classList.add('img-filters__button--active');
  clearPictures();
  renderPictures(shuffleArray(dataList).slice(0, RANDOM_PHOTOS_QUANTITY));
};

const clearPictures = () => {
  photosPool.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const shuffleArray = (dataList) => {
  for(let i = dataList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i + 1));
    let temp = dataList[j];
    dataList[j] = dataList[i];
    dataList[i] = temp;
  }
  return dataList;
};

const sortByDiscussed = (dataList) => {
  return dataList.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const clearActiveFiltersClasses = () => {
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');
};

export {renderPicturesFromServer};
