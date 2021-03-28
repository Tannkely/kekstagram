import { isEscEvent } from './util.js';

const QUANTITY_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComment = bigPicture.querySelector('.social__comments');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bodyOff = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  bodyOff.classList.remove('modal-open');
};

bigPictureClose.addEventListener('click', () => {
  closeModal();
});

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const showBigPicture = ({ url, likes, comments, description }) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, message, name }) => {
    const commentElement = socialComment.querySelector('.social__comment').cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsListFragment.appendChild(commentElement);
  });

  socialComment.innerHTML = '';
  socialComment.appendChild(commentsListFragment);

  const allComments = document.querySelectorAll('.social__comment');

  allComments.forEach((comment) => {
    comment.classList.add('hidden');
  });

  showComments(QUANTITY_COMMENTS);

  if (comments.length <= QUANTITY_COMMENTS) {
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  } else {
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }
};

const showComments = (n) => {
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  const initialComments = Array.prototype.slice.call(hiddenComments).slice(0, n);

  initialComments.forEach((comment) => {
    comment.classList.remove('hidden');
  });

  const quantityHiddenComments = document.querySelectorAll('.social__comment.hidden').length;
  document.querySelector('.displayed-comments').textContent = document.querySelectorAll('.social__comment').length - quantityHiddenComments;

  if (quantityHiddenComments === 0) {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', () => {
  showComments(QUANTITY_COMMENTS);
});

export { showBigPicture };
