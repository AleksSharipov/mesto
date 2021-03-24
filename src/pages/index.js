import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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

const formList = document.querySelectorAll('.popup__form');

/*edit */
const refactoringBtn = document.querySelector('.profile__button_refactoring_avatar');
const popupRefactoring = document.querySelector('.popup-edit');
const refName = popupRefactoring.querySelector('.popup__input_type_name');
const refWork = popupRefactoring.querySelector('.popup__input_type_work');
const userImg = document.querySelector('.profile__redact');
const nameUserCard = document.querySelector('.profile__title');
const userDescriptionCard = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');

/* Add card */
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



const api = new Api(token, cohortId);

api.getCard()
  .then((cards) => {
    const cardList = new Section({
      data: cards,
      rendered: (item) => {
        // console.log(item)
        const el = createCard(item);
        if (item.owner._id === id) {
          const cardTrash = el.querySelector('.element__trash');
          cardTrash.classList.add('element__trash-d');
          cardTrash.addEventListener('click', () => {
            popupDelCard.open()
          })
          popBtn.addEventListener('click', () => {
            api.deleteCard(item._id)
              .then(() => {
                popupDelCard.close()
              })
              .catch((err => {
                console.log(`Ошибка при удаление ${err}`);
              }))

          })
        }
        ulElement.append(el)

      }
    }, '.element')

    cardList.renderItem();

    const popAddCard = new PopupWithForm('.popup-add-card', (inpVal) => {
      const addObj = {
        name: inpVal["user-name"],
        link: inpVal["description"]
      }
      api.createCard(addObj)
        .then(res => {
          const cardElem = createCard(res)
          const cardTrash = cardElem.querySelector('.element__trash');
          cardTrash.classList.add('element__trash-d');
          cardTrash.addEventListener('click', () => {
            popupDelCard.open()
          })
          popBtn.addEventListener('click', () => {
            api.deleteCard(res._id)
              .then(() => {
                popupDelCard.close()
              })
              .catch((err => {
                console.log(`Ошибка при удаление ${err}`);
              }))

          })

          cardList.addItem(cardElem);

        })
        .catch(err => {
          console.log(`Error ${err}`)
        })
      popAddCard.close();
    })
    popAddCard.setEventListeners();

    addCardBtn.addEventListener('click', () => {
      popAddCard.open();
    })
  })

const popBtn = document.querySelector('.popup__form-btn_del')


const popupDelCard = new PopupWithForm('.popup-delite-card', (inpVal) => { })

popupDelCard.setEventListeners()

const popupWithImage = new PopupWithImage('.popup-show-card');
popupWithImage.setEventListeners();

// const cardList = new Section({
//   // data: initialCards,
//   data: {},
//   rendered: (item) => {
//     const el = createCard(item);
//     ulElement.append(el)
//   }
// }, '.element');

// cardList.renderItem();

function createCard(obj) {
  const el = new Card(obj, '#card-template', () => {
    popupWithImage.open(obj.link, obj.name);
  }, api);
  return el.generateCard(id);
}
const btnPopup = document.querySelector('.popup__form-btn_a');
const popupRefCard = new PopupWithForm('.popup-edit', (inpVal) => {
  btnPopup.textContent = 'Сохранение...'
  api.renameUserInfo(inpVal['user-name'], inpVal['description'])
    .then(res => {
      nameUserCard.textContent = res.name;
      userDescriptionCard.textContent = res.about;
      popupRefCard.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      btnPopup.textContent = 'Сохранить'
    })
});
popupRefCard.setEventListeners();


console.log(btnPopup.textContent)
const newProfileAvater = new PopupWithForm('.popup-update-avatar', (inpVal) => {

  api.newUserAvatar(inpVal.description)
    .then(res => {
      userAvatar.src = res.avatar;
      newProfileAvater.close();
    })
    .catch(err => {
      console.log(err)
    })

})

newProfileAvater.setEventListeners();

userImg.addEventListener('click', () => {
  newProfileAvater.open();
})

refactoringBtn.addEventListener('click', () => {
  api.getUserInfo()
    .then((res) => {
      refName.value = res.name;
      refWork.value = res.about;
      popupRefCard.open();
    })
    .catch(err => {
      console.log(err)
    })
  popupRefCard.open();
})

let id;

api.getUserInfo()
  .then(infoUser => {
    id = infoUser._id;
    const userInfo = new UserInfo('.profile__title', '.profile__description');
    userInfo.setUserInfo(infoUser.name, infoUser.about)
    userAvatar.src = infoUser.avatar;
  })
  .catch(err => {
    console.log(err)
  })
