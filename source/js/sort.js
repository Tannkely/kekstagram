import {createMixedArrayInRange} from './util.js';

let sourceImageData = [];
let imagesForRender = [];

const saveData = (imagesDataArray) => {
  sourceImageData = imagesDataArray.slice();
  imagesForRender = imagesDataArray.slice();
}

const setRenderData = (imagesDataArray) => {
  imagesForRender = imagesDataArray.slice();
}

const getSourceData = () => {
  return sourceImageData;
}

const getRenderData = () => {
  return imagesForRender;
}

const changeViewMode = (newViewMode) => {
  switch (newViewMode) {
    case 'filter-default':
      setRenderData(getSourceData());
      break;

    case 'filter-random':
      setRenderData(applyModeRandom());
      break;

    case 'filter-discussed':
      setRenderData(getSourceData());
      setRenderData(applyModeRate());
      break;
  }
  return getRenderData();
}
const applyModeRandom = () => {
  imagesForRender = [];
  createMixedArrayInRange(0,getSourceData().length-1).slice(0,10).forEach( (oneImage) => {
    imagesForRender.push(getSourceData()[oneImage]);
  });
  return imagesForRender;
};

const sortByRate = (elmA, elmB) => {
  const rateA = elmA.comments.length;
  const rateB = elmB.comments.length;
  return rateB - rateA;
}

const applyModeRate = () => {
  imagesForRender =  getRenderData().sort(sortByRate).slice() ;
  return imagesForRender;
};

export {getRenderData, saveData, changeViewMode} ;
