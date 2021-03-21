import { people } from './get-many-user.js';

//отображение фотографий пользователей
const picture = document.querySelector('#picture');
const pictures = document.querySelector('.pictures');

const getManyPictures = function () {
  for (let i = 0; i < people.length; i++) {
    const pictureLinkClone = picture.content.cloneNode(true);

    const pictureImage = pictureLinkClone.querySelector('.picture__img');
    const pictureInfo = pictureLinkClone.querySelector('.picture__info');
    const pictureComments = pictureInfo.querySelector('.picture__comments');
    const pictureLikes = pictureInfo.querySelector('.picture__likes');

    pictureImage.setAttribute('src', people[i].url);
    pictureImage.setAttribute('id', people[i].id);
    pictureImage.setAttribute('alt', people[i].description);
    pictureLikes.textContent = people[i].likes;
    pictureComments.textContent = people[i].comment.length;
    pictures.appendChild(pictureLinkClone);
    pictureLikes.setAttribute('dataLikes', people[i].likes);
  }
};
getManyPictures();

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentLoader = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');

pictures.addEventListener('click', (evt) => {
  const idPost = people[evt.target.id - 1]

  const bigPictureImg = bigPicture.querySelector('.big-picture__img > img');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialLikes = bigPicture.querySelector('.social__likes > .likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');

  bigPictureImg.setAttribute('src', idPost.url);
  socialCaption.textContent = idPost.description;
  socialLikes.textContent = idPost.likes;
  commentsCount.textContent = idPost.comment.length;


  getManyComments(idPost);

});

const getManyComments = function (idPost) {
  const socialComment = bigPicture.querySelector('.social__comment');
  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';
  for (let i = 0; i < idPost.comment.length; i++) {
    const socialCommentClone = socialComment.cloneNode(true);

    const socialPicture = socialCommentClone.querySelector('.social__picture');
    const socialText = socialCommentClone.querySelector('.social__text');

    socialPicture.setAttribute('src', idPost.comment[i].avatar);
    socialPicture.setAttribute('alt', idPost.comment[i].name);
    socialText.textContent = idPost.comment[i].message;
    socialComments.appendChild(socialCommentClone);
  }
};

pictures.addEventListener('click', () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  socialCommentLoader.classList.add('hidden');
});
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

export { pictures };
