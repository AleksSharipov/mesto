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

let elementList = document.querySelector('element__list');
let refactoringBtn = document.querySelector('.profile__button_refactoring_avatar');
let popupRefactoring = document.querySelector('.popup');
let closeBtn = document.querySelectorAll('.popup__close');
let popupForm = popupRefactoring.querySelector('.popup__form');
let popupFormAdd = popupRefactoring.querySelector('.popup__form-add-card');
let refName = popupRefactoring.querySelector('.popup__input_type_name');
let refWork = popupRefactoring.querySelector('.popup__input_type_work');

let profileName = document.querySelector('.profile__title');
let profileDescr = document.querySelector('.profile__description');


const sectionCard = document.querySelector('.elements');
const popupAddCard = document.querySelector('.popup-add-card');
const addCardBtn = document.querySelector('.profile__button_add_card');
const trashBtn = document.querySelectorAll('.element__trash');
const showCardPopup = document.querySelector('.popup-show-card');

function likeCard(itementLike) {
  itementLike.target.classList.toggle('element__like_active');
}


for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener('click', function () {
    closePopup(popupRefactoring);
    closePopup(popupAddCard);
    closePopup(showCardPopup);
  })
}


function trashCard(elem) {
  elem.target.parentNode.remove();
}

function openCars() {
  openPopup(showCardPopup);
}

function createElement(el, classAdd) {
  const a = document.createElement(el);
  a.classList.add(classAdd);
  return a;
}

function renderCards(arr) {
  const cardUl = document.createElement('ul')
  cardUl.classList.add('element');
  arr.forEach(element => {

    const elementList = createElement('li', 'element__list');
    const btnTrash = createElement('button', 'element__trash');
    btnTrash.classList.add('button-hover');

    const elImages = createElement('img', 'element__images');
    const elemDescr = createElement('div', 'element__description');
    const elemTitle = createElement('h3', 'element__title');
    const elemLike = createElement('button', 'element__like');
    elemLike.classList.add('button-hover');

    elemTitle.textContent = element.name;
    elImages.src = element.link;
    elImages.alt = element.name;

    elemDescr.append(elemTitle, elemLike);
    elementList.append(elImages, btnTrash, elemDescr);
    cardUl.append(elementList);
    sectionCard.append(cardUl);

    elemLike.addEventListener('click', likeCard);
    btnTrash.addEventListener('click', trashCard);
    elImages.addEventListener('click', function () {
      openCars();
      const img = document.querySelector('.popup__img');
      const name = document.querySelector('.popup__name');
      img.src = element.link;
      name.textContent = element.name;
    })

  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  refName.value = profileName.textContent;
  refWork.value = profileDescr.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = refName.value;
  profileDescr.textContent = refWork.value;
  closePopup(popupRefactoring);
})

refactoringBtn.addEventListener('click', function () {
  openPopup(popupRefactoring);
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
  const nameVal = document.querySelector('.popup__input_type_card-name').value;
})

popupAddCard.addEventListener('submit', function (e) {
  e.preventDefault();
  const elemCard = document.querySelector('.element');
  const nameVal = document.querySelector('.popup__input_type_card-name').value;
  const imgVal = document.querySelector('.popup__input_type_img-links').value;

  const elementList = createElement('li', 'element__list');
  const btnTrash = createElement('button', 'element__trash');
  btnTrash.classList.add('button-hover');

  const elImages = createElement('img', 'element__images');
  const elemDescr = createElement('div', 'element__description');
  const elemTitle = createElement('h3', 'element__title');
  const elemLike = createElement('button', 'element__like');
  elemLike.classList.add('button-hover');

  elemTitle.textContent = nameVal;
  elImages.src = imgVal;
  elImages.alt = nameVal;

  elemDescr.append(elemTitle, elemLike);
  elementList.append(elImages, btnTrash, elemDescr);
  elemCard.prepend(elementList);
  closePopup(popupAddCard);
  elemLike.addEventListener('click', likeCard);
  btnTrash.addEventListener('click', trashCard);
  elImages.addEventListener('click', function () {
    openCars();
    const img = document.querySelector('.popup__img');
    const name = document.querySelector('.popup__name');
    img.src = imgVal;
    name.textContent = nameVal;
  })
})


renderCards(initialCards);

