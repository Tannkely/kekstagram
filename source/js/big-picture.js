import {COMMENTS_QUANTITY_STEP, AVATAR_WIDTH, AVATAR_HEIGHT} from './constants.js';
import {closeOnEscKeydown} from './util.js';

const bigPhotosPopup = document.querySelector('.big-picture');
const closeBigPhotosPopupButton = document.querySelector('.big-picture__cancel');
const bigPhotosImgContainer = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosImg = bigPhotosImgContainer.querySelector('img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsPool = bigPhotosPopup.querySelector('.social__comments');
const bigPhotosDescription = bigPhotosPopup.querySelector('.social__caption');
const commentsLoaderButton = bigPhotosPopup.querySelector('.social__comments-loader');
const commentsCountValue = bigPhotosPopup.querySelector('.social__comment-count');

const renderLoadCommentsButton = (offset, total, callback) => {
  if (offset >= total) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', callback);
  } else {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', callback);
  }
};

const renderCommentsCount = (loaded, total) => {
  commentsCountValue.textContent = `${Math.min(loaded, total)} из ${total} комментариев`;
};

const renderBigPhotosPopup = (dataElement) => {
  bigPhotosImg.src = dataElement.url;
  bigPhotosLikesCount.textContent = dataElement.likes;
  bigPhotosDescription.textContent = dataElement.description;
};

const renderComment = (data) => {
  const commentContainer = document.createElement('li');
  const commentsAuthorAvatar = document.createElement('img');
  const commentsText = document.createElement('p');

  commentContainer.classList.add('social__comment');
  commentsAuthorAvatar.classList.add('social__picture');
  commentsText.classList.add('social__text');

  commentsAuthorAvatar.src = data.avatar;
  commentsAuthorAvatar.alt = data.name;
  commentsAuthorAvatar.width = AVATAR_WIDTH;
  commentsAuthorAvatar.height = AVATAR_HEIGHT;
  commentsText.textContent = data.message;

  commentContainer.appendChild(commentsAuthorAvatar);
  commentContainer.appendChild(commentsText);

  return commentContainer;
};

const appendComments = (dataList) => {
  const commentsFragment = document.createDocumentFragment();

  dataList.forEach((comment) => {
    const commentFragment = renderComment(comment);

    commentsFragment.appendChild(commentFragment);
  });

  bigPhotosCommentsPool.appendChild(commentsFragment);
};

const renderComments = (commentsList) => {
  let commentsLoaded = COMMENTS_QUANTITY_STEP;
  const commentsListCopy = [...commentsList];
  const handleCommentsLoad = () => {
    appendComments(commentsListCopy.splice(0, COMMENTS_QUANTITY_STEP))

    commentsLoaded += COMMENTS_QUANTITY_STEP;

    renderLoadCommentsButton(commentsLoaded, commentsList.length, handleCommentsLoad);
    renderCommentsCount(commentsLoaded, commentsList.length);
  };

  while (bigPhotosCommentsPool.firstChild) {
    bigPhotosCommentsPool.removeChild(bigPhotosCommentsPool.firstChild);
  }

  appendComments(commentsListCopy.splice(0, COMMENTS_QUANTITY_STEP));
  renderLoadCommentsButton(commentsLoaded, commentsList.length, handleCommentsLoad);
  renderCommentsCount(commentsLoaded, commentsList.length);

  return () => {
    while (bigPhotosCommentsPool.firstChild) {
      bigPhotosCommentsPool.removeChild(bigPhotosCommentsPool.firstChild);
    }

    commentsLoaderButton.removeEventListener('click', handleCommentsLoad);
  }
};

const openBigPhotosPopup = (pictureData) => () => {
  const unmountComments = renderComments(pictureData.comments);
  const closeButtonHandler = () => {
    bigPhotosPopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
    unmountComments();
    document.removeEventListener('keydown', closeOnEscKeydown(closeButtonHandler));
  }

  document.body.classList.add('modal-open');
  bigPhotosPopup.classList.remove('hidden');

  renderBigPhotosPopup(pictureData);

  document.addEventListener('keydown', closeOnEscKeydown(closeButtonHandler));
  closeBigPhotosPopupButton.addEventListener('click', closeButtonHandler, {once: true});
};

export {openBigPhotosPopup};
