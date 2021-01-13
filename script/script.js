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

const closeBtns = document.querySelectorAll('.popup__close');

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



const showCardPopup = document.querySelector('.popup-show-card');

/* Добавляем все карточки */
const ulElement = document.querySelector('.element');

function createCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__images').src = link;
  cardElement.querySelector('.element__images').alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  const btnLike = cardElement.querySelector('.element__like');
  const btnTrash = cardElement.querySelector('.element__trash');
  const elementImages = cardElement.querySelector('.element__images');
  btnLike.addEventListener('click', function (e) {
    const eventTarget = e.target;
    eventTarget.classList.toggle('element__like_active');
  })

  btnTrash.addEventListener('click', function (e) {
    const eventTarget = e.target;
    eventTarget.parentNode.remove();
  })

  elementImages.addEventListener('click', function (e) {
    const elSrc = e.target.src;
    const elVal = e.target.alt;
    showCard(showCardPopup, elSrc, elVal);
  })

  return cardElement;
}


initialCards.forEach(elem => {
  const el = createCard(elem.link, elem.name);
  ulElement.append(el);
})


function showCard(popup, imgSrc, imgVal) {
  popup.classList.add('popup_opened');
  popupImg.src = imgSrc;
  popupNameCard.textContent = imgVal;
}

const popupImg = document.querySelector('.popup__img');
const popupNameCard = document.querySelector('.popup__name');

function openCars() {
  openPopup(showCardPopup);

}

for (let i = 0; i < closeBtns.length; i++) {
  const el = closeBtns[i];
  el.addEventListener('click', function (e) {
    e.preventDefault();
    closePopup(el.closest('.popup'));
  })
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  refName.value = profileName.textContent;
  refWork.value = profileDescr.textContent;
}

refactoringBtn.addEventListener('click', function () {
  openPopup(popupRefactoring);
})


profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = refName.value;
  profileDescr.textContent = refWork.value;
  closePopup(popupRefactoring)
})



popupRefactoring.addEventListener('click', function (e) {
  if (e.target === popupRefactoring) {
    closePopup(popupRefactoring);
  }
})

addCardBtn.addEventListener('click', function () {
  openPopup(popupAddCard);
})

popupAddCard.addEventListener('click', function (e) {
  if (e.target === popupAddCard) {
    closePopup(popupAddCard);
  }
})

popupFormAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameNewCard = popupFormAdd.querySelector('.popup__input_type_card-name').value;
  const linkNewCard = popupFormAdd.querySelector('.popup__input_type_img-links').value;
  const el = createCard(linkNewCard, nameNewCard)

  ulElement.prepend(el);

  closePopup(popupAddCard);
})
