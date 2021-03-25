import { drawUsersPictures } from './pictures.js';
import { setData, setClickEvts } from './big-pictures.js';
import { showAlert } from './util.js';
import { imgFilter, imgFilterForm, updatePictures, onFilterClick } from './filter-posts.js';

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    return response.json();
  })
  .then((posts) => {
    drawUsersPictures(posts);
    setData(posts);
    setClickEvts();
    imgFilter.classList.remove('img-filters--inactive');
    imgFilterForm.addEventListener('click', (evt) => {
      onFilterClick(evt, posts);
      updatePictures();
    });
  })
  
  .catch(() => {
    showAlert('Не удалось загрузить посты с сервера. Попробуйте ещё раз');
  });
