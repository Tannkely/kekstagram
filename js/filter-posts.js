import { drawUsersPictures } from './pictures.js';

const BIDE = 500;
const RANDOM_PICTURES_QUANTITY = 10;

const imgFilter = document.querySelector('.img-filters');
const imgFilterForm = document.querySelector('.img-filters__form');

const setDefaultPosts = (array) => array.slice();
const setRandomPosts = (array) => _.shuffle(array).slice(0, RANDOM_PICTURES_QUANTITY);
const setCommentsPosts = (array) => array.slice().sort((prev, next) => next.comments.length - prev.comments.length);

const updateFilter = (array) => {

  const filterTypes = {
    'filter-default': setDefaultPosts(array),
    'filter-random': setRandomPosts(array),
    'filter-discussed': setCommentsPosts(array),
  };

  let filterType = filterTypes[imgFilter.querySelector('.img-filters__button--active').id];
  return filterType;
}

const updatePictures = () => {
  document.querySelectorAll('.picture').forEach(element => element.remove());
};

const onFilterClick = (evt, posts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  } else {
    let activeElement = evt.target.parentElement.querySelector('.img-filters__button--active');
    if (activeElement) {
      activeElement.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    const debounceRender = _.debounce(drawUsersPictures, BIDE);
    debounceRender(updateFilter(posts));
  }
};

export { imgFilter, imgFilterForm, updatePictures, onFilterClick }
