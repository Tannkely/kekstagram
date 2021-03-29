import {isEscEvent, clearElementInner} from './util.js';

const OPEN_COMMENTS_DELAY = 300;

const pageBody = document.querySelector('body');
const socialCommentCount = document.querySelector('.social__comment-count');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureModal.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureModal.querySelector('.social__comments');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');

const createNewCommentPack = (commentPack, stopIndex = 4) => {
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.innerHTML = `${stopIndex+1} из <span class="comments-count">${commentPack.length}</span> комментариев` ;
  commentPack.forEach( (oneComment, index) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    if (index > stopIndex) { newComment.classList.add('hidden') }
    const newCommentImg = document.createElement('img');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = oneComment.avatar;
    newCommentImg.alt = oneComment.name;
    newCommentImg.width = 35;
    newCommentImg.height = 35;
    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = oneComment.message;
    newComment.appendChild(newCommentImg);
    newComment.appendChild(newCommentText);
    bigPictureCommentsList.appendChild(newComment);
  });
}

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const closeModalButton = document.querySelector('.big-picture__cancel');

const closeModal = () => {
  bigPictureModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  clearElementInner(bigPictureCommentsList);
  document.removeEventListener('keydown', onModalEscKeydown);
}

closeModalButton.addEventListener('click', () => {
  closeModal();
});

const hideLoadMoreButton = () => {
  const commentsLoadButton = document.querySelector('.comments-loader');
  commentsLoadButton.classList.add('hidden');
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.classList.add('hidden');
  commentsLoadButton.removeEventListener('click', openComments );
}

const showLoadMoreButton = () => {
  const commentsLoadButton = document.querySelector('.comments-loader');
  commentsLoadButton.classList.remove('hidden');
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.classList.remove('hidden');
  const debounceRender = _.debounce(() => openComments(), OPEN_COMMENTS_DELAY);
  commentsLoadButton.addEventListener('click', () => { debounceRender(); });
}

const openComments = (step = 5) => {
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.innerHTML = (parseInt(commentsCount.innerHTML.slice(0,commentsCount.innerHTML.indexOf(' '))) + step)
    .toString()+commentsCount.innerHTML.slice(commentsCount.innerHTML.indexOf(' ')) ;
  const allComments = document.querySelectorAll('.social__comment.hidden');
  allComments.forEach( (oneComment) => {
    if (oneComment.classList.contains('hidden') && step !== 0) {
      step -= 1;
      oneComment.classList.remove('hidden');
    }
  });
  if (!allComments[allComments.length-1].classList.contains('hidden')) { hideLoadMoreButton(); }
}

const showBigPicture = (imageInfo) => {
  bigPictureModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  clearElementInner(bigPictureCommentsList);
  bigPictureImg.src = imageInfo.url;
  bigPictureLikes.textContent = imageInfo.likes;
  bigPictureCommentsCount.textContent = imageInfo.comments.length.toString();
  bigPictureDescription.textContent = imageInfo.description;
  socialCommentCount.classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  createNewCommentPack(imageInfo.comments);
  if (imageInfo.comments.length>5) {
    showLoadMoreButton();
  }
  document.addEventListener('keydown', onModalEscKeydown);
}

export {pageBody, showBigPicture}


