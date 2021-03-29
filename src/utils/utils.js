export default function renderLoading(selector, ifLoading) {
  const popupBtn = document.querySelector(selector).querySelector('.popup__form-btn');;

  if (ifLoading) {
    popupBtn.textContent = 'Сохранение...'
  } else {
    popupBtn.textContent = 'Сохраненить'
  }
}
