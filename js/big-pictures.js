const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentLoader = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');

const setData = (allUsers) => {
  const picturesLinks = document.querySelectorAll('.picture');
  for (let i = 0; i < picturesLinks.length; i++) {
    picturesLinks[i].addEventListener('click', (evt) => {
      const idPost = allUsers.filter(item => item.id == evt.target.id.split('-')[1])[0];
      const bigPictureImg = bigPicture.querySelector('.big-picture__img > img');
      const socialCaption = bigPicture.querySelector('.social__caption');
      const socialLikes = bigPicture.querySelector('.social__likes > .likes-count');
      const commentsCount = bigPicture.querySelector('.comments-count');

      bigPictureImg.setAttribute('src', idPost.url);
      bigPictureImg.setAttribute('alt', idPost.description);
      socialCaption.textContent = idPost.description;
      socialLikes.textContent = idPost.likes;
      commentsCount.textContent = idPost.comments.length;

      getManyComments(idPost);
    });
  }
};

const getManyComments = (idPost) => {
  const socialComment = bigPicture.querySelector('.social__comment');
  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';
  for (let i = 0; i < idPost.comments.length; i++) {
    const socialCommentClone = socialComment.cloneNode(true);

    const socialPicture = socialCommentClone.querySelector('.social__picture');
    const socialText = socialCommentClone.querySelector('.social__text');

    socialPicture.setAttribute('src', idPost.comments[i].avatar);
    socialPicture.setAttribute('alt', idPost.comments[i].name);
    socialText.textContent = idPost.comments[i].message;
    socialComments.appendChild(socialCommentClone);
  }
  const allComments = document.querySelectorAll('.social__comment');

  allComments.forEach((comment) => {
    comment.classList.add('hidden');
  });

  showComments(5);

  if (idPost.comments.length <= 5) {
    socialCommentCount.classList.add('hidden');
    socialCommentLoader.classList.add('hidden');
  } else {
    socialCommentCount.classList.remove('hidden');
    socialCommentLoader.classList.remove('hidden');
  }
};

//Hide comments, add on click. Counting the number of open comments
const showComments = (n) => {
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  const initialComments = Array.prototype.slice.call(hiddenComments).slice(0, n);

  initialComments.forEach((comment) => {
    comment.classList.remove('hidden');
  });

  const quantityHiddenComments = document.querySelectorAll('.social__comment.hidden').length;
  document.querySelector('.displayed-comments').textContent = document.querySelectorAll('.social__comment').length - quantityHiddenComments;

  if (quantityHiddenComments == 0) {
    socialCommentLoader.classList.add('hidden');
  }
};

socialCommentLoader.addEventListener('click', () => {
  showComments(5);
});

//Sort out. Click to open
const setClickEvts = () => {
  const picturesLinks = document.querySelectorAll('.picture');
  for (let i = 0; i < picturesLinks.length; i++) {
    picturesLinks[i].addEventListener('click', function (evt) {
      if (evt.target.id) {
        body.classList.add('modal-open');
        bigPicture.classList.remove('hidden');
      }
    });
  }
};

const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});

export { setData, setClickEvts };
