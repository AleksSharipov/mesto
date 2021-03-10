import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


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

formList.forEach(anyForm => {
  const validForm = new FormValidator(configValidation, anyForm);

  anyForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  validForm.enableValidation();
})

const popupWithImage = new PopupWithImage('.popup-show-card');
popupWithImage.setEventListeners();

const cardList = new Section({
  data: initialCards,
  rendered: (item) => {
    createCard(item)
  }
}, '.element');

cardList.renderItem();

function createCard(obj) {
  const el = new Card(obj, '#card-template', () => {
    popupWithImage.open(obj.link, obj.name);
  });
  ulElement.append(el.generateCard());
}

const userInfo = new UserInfo('.profile__title', '.profile__description');
// console.log(userInfo.getUserInfo());
const popupRefCard = new PopupWithForm('.popup-edit', (inpVal) => {
  userInfo.setUserInfo(inpVal['user-name'], inpVal['description'])
});
popupRefCard.setEventListeners();

refactoringBtn.addEventListener('click', () => {
  const val = userInfo.getUserInfo();
  refName.value = val.name;
  refWork.value = val.profession;
  popupRefCard.open();
})

/* popup Add cards  */

const popAddCard = new PopupWithForm('.popup-add-card', (inpVal) => {
  const addObj = {
    name: inpVal["user-name"],
    link: inpVal["description"]
  }
  const card = new Card(addObj, '#card-template', () => {
    popupWithImage.open(addObj.link, addObj.name);
  });
  const cardElem = card.generateCard();
  if (addObj["name"] !== '' && addObj["link"]) {
    cardList.addItem(cardElem)
  }
})
popAddCard.setEventListeners();

addCardBtn.addEventListener('click', () => {
  popAddCard.open();
})
