let refactoringBtn = document.querySelector('.profile__button_refactoring');
let popupRefactoring = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let refName = document.querySelector('.popup__form-input_name');
let refWork = document.querySelector('.popup__form-input_work');

let profileName = document.querySelector('.profile__title');
let profileDescr = document.querySelector('.profile__description');

function newPopup(popup) {
  popup.classList.toggle('popup_opened');
  refName.value = profileName.textContent;
  refWork.value = profileDescr.textContent;
  console.log(refName)
}

popupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = refName.value;
  profileDescr.textContent = refWork.value;
  newPopup(popupRefactoring);
})

refactoringBtn.addEventListener('click', function () {
  newPopup(popupRefactoring);
})

closeBtn.addEventListener('click', function () {
  newPopup(popupRefactoring);
})

popup.addEventListener('click', function (e) {
  if (e.target === popup) {
    newPopup(popupRefactoring);
  }
})
