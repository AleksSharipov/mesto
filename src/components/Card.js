
export default class Card {
  constructor(data, cardSelector, handleCardClick, api) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._counterCardLike = data.likes;
    this._api = api;
    this._data = data
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _setEventListener() {
    this._element.querySelector('.element__trash').addEventListener('click', (e) => {
      console.log(this._data._id)
      e.target.closest('.element__list').remove();
      // this._api.deleteCard(this._data._id)
      //   .then(() => {
      //
      //   })
      //   .catch((err => {
      //     console.log(`Ошибка при удаление ${err}`);
      //   }))

    })

    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._api.likeCard(this._data._id)
        .then((res) => {
          e.target.classList.add('element__like_active');
        })
        .catch(err => {
          console.log(err)
        })

      if (e.target.classList.contains('element__like_active')) {
        this._api.deliteLike(this._data._id)
          .then(res => {
            e.target.classList.remove('element__like_active');
          })
      }
    })

    this._element.querySelector('.element__images').addEventListener('click', (e) => {
      this._handleCardClick(this._name, this._link);
    })
  }

  isLiked(id) {
    if (this._counterCardLike) {
      this._element.querySelector('.element__counter').textContent = this._counterCardLike.length;
    }
    this._data.likes.some(like => {
      if (like._id == id) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      }
    })
  }

  generateCard(id) {
    this._element = this._getTemplate();
    this.counter = this._element.querySelector('.element__counter')

    this._element.querySelector('.element__images').src = this._link;
    this._element.querySelector('.element__images').alt = this._name
    this._element.querySelector('.element__title').textContent = this._name;

    // this._element.querySelector('.element__counter').textContent = (this._counterCardLike.length);
    this.isLiked(id);
    this._setEventListener();
    return this._element;
  }
}


