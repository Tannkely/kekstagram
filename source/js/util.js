function debounce(fn, interval) {
  let timer;
  return function debounced() {
    clearTimeout(timer);
    let args = arguments;
    let that = this;
    timer = setTimeout(function callOriginalFn() {
      fn.apply(that, args);
    }, interval);
  };
}
const getCommentsAmount = function (photo) {
  return photo.comments.length;
};
const sortCommentDescend = function (pictureA, pictureB) {
  return getCommentsAmount(pictureB) - getCommentsAmount(pictureA);
};

export {debounce, sortCommentDescend}
