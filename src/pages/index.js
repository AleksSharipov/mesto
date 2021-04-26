import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelele from '../components/PopupWithDelete.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import renderLoading from '../utils/utils.js';

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

const inpNameNewCard = document.querySelector('.popup__input_type_card-name')
const inpLinkNewCard = document.querySelector('.popup__input_type_img-links')
const popupWithImageSelector = '.popup-show-card';
const formRedactAvatarSelector = document.querySelector('.popup__form-remove-avatar');
const popupUpdateAvatarSelector = '.popup-update-avatar';
const formAddCardSelector = document.querySelector('.popup__form-add-card');
const popupFormAddCardBtn = document.querySelector('.profile__button_add_card ');
const popupAddCardSelector = '.popup-add-card';
const formEditSelector = document.querySelector('.popup__form-edit')
const popupFormEditBtn = document.querySelector('.profile__button_refactoring_avatar');
const popupEditSelector = '.popup-edit';
const popupDeleteCardSelector = '.popup-delite-card';
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const popupRefactoring = document.querySelector('.popup-edit');
const refName = popupRefactoring.querySelector('.popup__input_type_name');
const refWork = popupRefactoring.querySelector('.popup__input_type_work');
const redactAvatarBtn = document.querySelector('.profile__redact');
const element = '.element';
const selectorElementList = '.element__list';
const cardTemplate = '#card-template';
const currentDate = new Date().getFullYear();
const futerDate = document.querySelector('.footer__author');
futerDate.textContent = `${currentDate} Mesto Russia`

const api = new Api(token, cohortId);

function createCard(obj, user, cardSelectror) {
  const card = new Card({
    data: obj,
    user: user,
    handleCardClick: () => {
      popupWithImage.open(obj.link, obj.name)
    },
    handleLikeCard: (id) => {
      if (card.isLiked()) {
        api.deleteLikeCard(id)
          .then((res) => {
            card.likeHandler(res)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        api.likeCard(id)
          .then((res) => {
            card.likeHandler(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleDeleteCard: (element, id) => {
      popupDelCard.open({ element, id })
    }
  }, cardSelectror);
  return card;
}

const cardList = new Section({
  data: {},
  rendered: (obj, user) => {
    const card = createCard(obj, user, cardTemplate);
    const oneCard = card.generateCard();
    cardList.appendItem(oneCard);
  },
}, element);

const userInfo = new UserInfo(profileTitle, profileDescription, profileAvatar);

const allPromises = [api.getUserInfo(), api.getCard()];

Promise.all(allPromises)
  .then(([resGetUserInfo, resGetCard]) => {
    userInfo.setUserInfo(resGetUserInfo.name, resGetUserInfo.about, resGetUserInfo.avatar, resGetUserInfo._id);

    cardList.setData(resGetCard);
    cardList.renderItem(resGetUserInfo);

    popupFormEditBtn.addEventListener('click', () => {
      formEdit.disableInputError();
      formEditSelector.reset();
      editProfilePopup.open()
      const infoUser = userInfo.getUserInfo();
      refName.value = infoUser.name;
      refWork.value = infoUser.profession;
    })

    popupFormAddCardBtn.addEventListener('click', () => {
      formAddCard.disableInputError();
      formAddCard.disableButton();
      formAddCardSelector.reset();
      popupAddCard.open();
      inpNameNewCard.value = '';
      inpLinkNewCard.value = '';
    })

    redactAvatarBtn.addEventListener('click', () => {
      formRedactAvatar.disableInputError();
      formRedactAvatar.disableButton();
      formRedactAvatarSelector.reset()
      editAvatarPopup.open()
    })
  })

const popupDelCard = new PopupWithDelele({
  popupSelector: popupDeleteCardSelector,
  submitCallback: ({ element, id }) => {
    renderLoading(popupDeleteCardSelector, true)
    api.deleteCard(id)
      .then(() => {
        element.closest(selectorElementList).remove()
        popupDelCard.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(popupDeleteCardSelector, false)
      })
  }
})
popupDelCard.setEventListeners();

/*Редактирование профиля*/
const formEdit = new FormValidator(configValidation, formEditSelector)
formEdit.enableValidation();
const editProfilePopup = new PopupWithForm(popupEditSelector, (value) => {
  renderLoading(popupEditSelector, true)
  api.renameUserInfo(value['user-name'], value['description'])
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
      editProfilePopup.close()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(popupEditSelector, false)
    })
})
editProfilePopup.setEventListeners();

/*Добавление карточки*/
const formAddCard = new FormValidator(configValidation, formAddCardSelector);
formAddCard.enableValidation();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (value) => {
  renderLoading(popupAddCardSelector, true)
  api.createCard({
    name: value["user-name"],
    link: value["description"]
  })
    .then(res => {
      const card = createCard(res, userInfo.getUserInfo(), cardTemplate);
      cardList.addItem(card.generateCard())
      popupAddCard.close()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(popupAddCardSelector, false)
    })
})
popupAddCard.setEventListeners();

/*Открытие картинки */
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

/* Редактирование аватарки */

const formRedactAvatar = new FormValidator(configValidation, formRedactAvatarSelector);
formRedactAvatar.enableValidation();

const editAvatarPopup = new PopupWithForm(popupUpdateAvatarSelector, (value) => {
  renderLoading(popupUpdateAvatarSelector, true)
  api.newUserAvatar(value.description)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id)
      editAvatarPopup.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(popupUpdateAvatarSelector, false)
    })
})
editAvatarPopup.setEventListeners();


