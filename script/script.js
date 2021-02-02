const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popups = document.querySelectorAll('.popup');

/*edit */
const refactoringBtn = document.querySelector('.profile__button_refactoring_avatar');
const popupRefactoring = document.querySelector('.popup-edit');
const profileForm = popupRefactoring.querySelector('.popup__form-edit');
const refName = popupRefactoring.querySelector('.popup__input_type_name');
const refWork = popupRefactoring.querySelector('.popup__input_type_work');
const profileName = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

/* Add card */
const popupAddCard = document.querySelector('.popup-add-card');
const popupFormAdd = popupAddCard.querySelector('.popup__form-add-card');
const addCardBtn = document.querySelector('.profile__button_add_card');

/*popup showCard */
const showCardPopup = document.querySelector('.popup-show-card');
const popupImg = document.querySelector('.popup__img');
const popupNameCard = document.querySelector('.popup__name');

/* Добавляем все карточки */
const ulElement = document.querySelector('.element');

function createCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const elementImages = cardElement.querySelector('.element__images');

  elementImages.src = link;
  elementImages.alt = name;

  cardElement.querySelector('.element__title').textContent = name;

  const btnLike = cardElement.querySelector('.element__like');
  const btnTrash = cardElement.querySelector('.element__trash');


  btnLike.addEventListener('click', handleLikeIcon)

  btnTrash.addEventListener('click', handleDeleteCard)

  elementImages.addEventListener('click', function () {
    handlePreviewPicture(name, link)
  })

  return cardElement;
}

const handleDeleteCard = (e) => {
  const eventTarget = e.target;
  eventTarget.closest('.element__list').remove();
};

const handleLikeIcon = (e) => {
  const eventTarget = e.target;
  eventTarget.classList.toggle('element__like_active');
};

const handlePreviewPicture = (name, link) => {
  const elSrc = link;
  const elVal = name;
  showCard(elSrc, elVal);
};


initialCards.forEach(elem => {
  const el = createCard(elem.link, elem.name);
  ulElement.append(el);
})

function closePopupEsc() {
  for (let i = 0; i < popups.length; i++) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePopup(popups[i]);
      }
    })
  }

}

/* логика popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');

  closePopupEsc()
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  closePopupEsc()
}

popups.forEach(popup => {
  popup.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

/*popup Edit */
refactoringBtn.addEventListener('click', function () {
  openPopup(popupRefactoring);
  refName.value = profileName.textContent;
  refWork.value = profileDescr.textContent;
})

profileForm.addEventListener('submit', function (e) {
  // e.preventDefault();
  profileName.textContent = refName.value;
  profileDescr.textContent = refWork.value;
  closePopup(popupRefactoring)
})

/* popup Add cards  */

addCardBtn.addEventListener('click', function () {
  openPopup(popupAddCard);
})

popupFormAdd.addEventListener('submit', function (e) {
  // e.preventDefault();
  const nameNewCard = popupFormAdd.querySelector('.popup__input_type_card-name').value;
  const linkNewCard = popupFormAdd.querySelector('.popup__input_type_img-links').value;
  const btn = popupFormAdd.querySelector('.popup__form-btn');
  btn.classList.add('popup__form-btn_disabled');
  const el = createCard(linkNewCard, nameNewCard)

  ulElement.prepend(el);


  closePopup(popupAddCard);
  popupFormAdd.reset();
})

/*show card popup */
function showCard(imgSrc, imgVal) {
  openPopup(showCardPopup);
  popupImg.src = imgSrc;
  popupImg.alt = imgVal;

  popupNameCard.textContent = imgVal;
}


