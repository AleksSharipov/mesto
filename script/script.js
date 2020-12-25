let refactoringBtn = document.querySelector('.profile__button_refactoring_avatar');
let popupRefactoring = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close');
let popupForm = popupRefactoring.querySelector('.popup__form');
let refName = popupRefactoring.querySelector('.popup__input_name');
let refWork = popupRefactoring.querySelector('.popup__input_work');

let profileName = document.querySelector('.profile__title');
let profileDescr = document.querySelector('.profile__description');

// function newPopup(popup) {
//   popup.classList.toggle('popup_opened');
//   // refName.value = profileName.textContent;
//   // refWork.value = profileDescr.textContent;
// }

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

closeBtn.addEventListener('click', function () {
  closePopup(popupRefactoring);
})

popupRefactoring.addEventListener('click', function (e) {
  if (e.target === popupRefactoring) {
    closePopup(popupRefactoring);
  }
})
