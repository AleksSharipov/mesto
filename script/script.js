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
const a = null;
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
  btnLike.addEventListener('click', function (e) {
    const eventTarget = e.target;
    eventTarget.classList.toggle('element__like_active');
  })

  btnTrash.addEventListener('click', function (e) {
    const eventTarget = e.target;
    eventTarget.closest('.element__list').remove();
  })

  elementImages.addEventListener('click', function () {
    const elSrc = link;
    const elVal = name;
    showCard(elSrc, elVal);
  })

  return cardElement;
}


initialCards.forEach(elem => {
  const el = createCard(elem.link, elem.name);
  ulElement.append(el);
})

/* логика popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', (e) => {
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
  e.preventDefault();
  profileName.textContent = refName.value;
  profileDescr.textContent = refWork.value;
  closePopup(popupRefactoring)
})

/* popup Add cards  */

addCardBtn.addEventListener('click', function () {
  openPopup(popupAddCard);
})

popupFormAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameNewCard = popupFormAdd.querySelector('.popup__input_type_card-name').value;
  const linkNewCard = popupFormAdd.querySelector('.popup__input_type_img-links').value;
  const el = createCard(linkNewCard, nameNewCard)

  ulElement.prepend(el);

  closePopup(popupAddCard);
})

/*show card popup */
function showCard(imgSrc, imgVal) {
  openPopup(showCardPopup);
  popupImg.src = imgSrc;
  popupNameCard.textContent = imgVal;
}


