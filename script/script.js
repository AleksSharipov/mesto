import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formList = document.querySelectorAll('.popup__form');

formList.forEach(anyForm => {
  const validForm = new FormValidator(configValidation, anyForm);

  anyForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  validForm.enableValidation();
})

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

/* Добавляем все карточки */
const ulElement = document.querySelector('.element');

initialCards.forEach(elem => {
  const el = new Card(elem, '#card-template');
  const createEl = el.generateCard();

  ulElement.append(createEl);
})



function closePopupEsc(e) {
  const activePopup = document.querySelector('.popup_opened');
  if (e.key === 'Escape' && activePopup) {
    closePopup(activePopup);
  }
}

/* логика popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
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

popupFormAdd.addEventListener('submit', function () {
  const nameNewCard = popupFormAdd.querySelector('.popup__input_type_card-name').value;
  const linkNewCard = popupFormAdd.querySelector('.popup__input_type_img-links').value;
  const addObj = {
    name: nameNewCard,
    link: linkNewCard
  }

  const btn = popupFormAdd.querySelector('.popup__form-btn');
  btn.classList.add('popup__form-btn_disabled');

  btn.disabled = true;

  const el = new Card(addObj, '#card-template');
  const createEl = el.generateCard()
  ulElement.prepend(createEl);


  closePopup(popupAddCard);
  popupFormAdd.reset();
})

