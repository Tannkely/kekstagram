import './util.js';
import { getData } from './data.js';
import { drawUsersPictures } from './pictures.js';
import './big-pictures.js';
import './editor.js';
import './effects.js';
import './validation.js';
import { setPictureFilter } from './filter-posts.js';
import './load-user-photo.js';

getData((pictures) => {
  drawUsersPictures(pictures);
  setPictureFilter(pictures);
});
