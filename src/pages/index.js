import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelele from '../components/PopupWithDelete.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

const token = 'd1b254cd-47f5-43a0-a278-b7e222ba6292';
const cohortId = 'cohort-21';

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/*edit */
const popupRefactoring = document.querySelector('.popup-edit');
const refName = popupRefactoring.querySelector('.popup__input_type_name');
const refWork = popupRefactoring.querySelector('.popup__input_type_work');

const api = new Api(token, cohortId);

function createCard(obj, user, cardSelectror) {
  const el = new Card({
    data: obj,
    user: user,
    handleCardClick: () => {
      popupWithImage.open(obj.link, obj.name)
    },
    handleLikeCard: (id) => {
      if (el.isLiked()) {
        api.deleteLikeCard(id)
          .then((res) => {
            el.likeSpan(res)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        api.likeCard(id)
          .then((res) => {
            el.likeSpan(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleDeleteCard: (element, id) => {
      console.log(element)
      popupDelCard.open({ element, id })
    }
  }, cardSelectror);
  return el;
}

const cardList = new Section({
  data: {},
  rendered: (obj, user) => {
    const card = createCard(obj, user, '#card-template');
    const oneCard = card.generateCard();
    cardList.appendItem(oneCard);
  },
}, '.element');

const userInfo = new UserInfo('.profile__title', '.profile__description', '.profile__avatar');

const allPromises = [api.getUserInfo(), api.getCard()];

Promise.all(allPromises)
  .then(([resGetUserInfo, resGetCard]) => {
    userInfo.setUserInfo(resGetUserInfo.name, resGetUserInfo.about, resGetUserInfo.avatar, resGetUserInfo._id);

    cardList.setData(resGetCard);
    cardList.renderItem(resGetUserInfo);

    popupFormEditBtn.addEventListener('click', () => {
      formEdit.hideInputError();
      formEditSelector.reset();
      editProfilePopup.open()
      const infoUser = userInfo.getUserInfo();
      refName.value = infoUser.name;
      refWork.value = infoUser.profession;
    })

    popupFormAddCardBtn.addEventListener('click', () => {
      formAddCard.hideInputError();
      formAddCardSelector.reset();
      popupAddCard.open();
      inpNameNewCard.value = '';
      inpLinkNewCard.value = '';
    })

    redactAvatarBtn.addEventListener('click', () => {
      formRedactAvatar.hideInputError();
      editAvatarPopup.open()
    })

  })

function loadingButton(selector, ifLoading) {
  const popupBtn = document.querySelector(selector);

  if (ifLoading) {
    popupBtn.textContent = 'Сохранение...'
  } else {
    popupBtn.textContent = 'Сохраненить'
  }
}

const popupDelCard = new PopupWithDelele({
  popupSelector: '.popup-delite-card',
  submitCallback: ({ element, id }) => {
    api.deleteCard(id)
      .then(() => {
        element.closest('.element__list').remove()
        popupDelCard.close();
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
popupDelCard.setEventListeners();

/*Редактирование профиля*/
const formEditSelector = document.querySelector('.popup__form-edit')
const formEdit = new FormValidator(configValidation, formEditSelector)
const popupFormEditBtn = document.querySelector('.profile__button_refactoring_avatar');
formEdit.enableValidation();
const editProfilePopup = new PopupWithForm('.popup-edit', (value) => {
  loadingButton('.popup__form-btn_a', true)
  api.renameUserInfo(value['user-name'], value['description'])
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
      editProfilePopup.close()
      loadingButton('.popup__form-btn_a', false)
    })
    .catch(err => {
      console.log(err)
    })
})
editProfilePopup.setEventListeners();

/*Добавление карточки*/
const formAddCardSelector = document.querySelector('.popup__form-add-card');
const formAddCard = new FormValidator(configValidation, formAddCardSelector);
formAddCard.enableValidation();
const popupFormAddCardBtn = document.querySelector('.profile__button_add_card ');
const popupAddCard = new PopupWithForm('.popup-add-card', (value) => {
  api.createCard({
    name: value["user-name"],
    link: value["description"]
  })
    .then(res => {
      const card = createCard(res, userInfo.getUserInfo(), '#card-template');
      cardList.addItem(card.generateCard())
      popupAddCard.close()
    })
    .catch(err => {
      console.log(err)
    })
})
popupAddCard.setEventListeners()

const inpNameNewCard = document.querySelector('.popup__input_type_card-name')
const inpLinkNewCard = document.querySelector('.popup__input_type_img-links')

/*Открытие картинки */
const popupWithImage = new PopupWithImage('.popup-show-card');
popupWithImage.setEventListeners();

/* Редактирование аватарки */
const formRedactAvatarSelector = document.querySelector('.popup__form-add-card');
const formRedactAvatar = new FormValidator(configValidation, formRedactAvatarSelector);
formRedactAvatar.enableValidation();
const editAvatarPopup = new PopupWithForm('.popup-update-avatar', (value) => {
  api.newUserAvatar(value.description)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id)
      editAvatarPopup.close()
    })
    .catch(err => {
      console.log(err)
    })
})
editAvatarPopup.setEventListeners()
const redactAvatarBtn = document.querySelector('.profile__redact');

