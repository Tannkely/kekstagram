import './upload-img.js';
import './big-pictures.js';
import './pictures.js';
import './img-size-control.js';
import './filter-posts.js';
import './validation.js';
import {saveData} from './sort.js' ;
import {initSortMode, renderImages} from './pictures.js';
import {loadServerData} from './data.js';
import {showAlert} from './util.js';

loadServerData.then(
  (getData) => { return renderImages(getData); },
  (err) => { showAlert(err);} ).then(
  (viewData) => {
    return saveData(viewData);
  }).then(() => {
  initSortMode();
});
