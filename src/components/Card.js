
export default class Card {
  constructor({ data, user, handleCardClick, handleLikeCard, handleDeleteCard }, cardSelector) {
    this._data = data;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._handleLiceCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._name = this._data.name;
    this._link = this._data.link;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    // console.log(cardElement)
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    // console.log(this._element)
    this._setEventListener();
    this._deleteIcon();
    this.likeHandler(this._data);

    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    return this._element;
  }

  isLiked() {
    if (this._data.likes.some((like) => like._id === this._user._id)) {
      // console.log('true')
      return true;
    } else {
      // console.log('false')
      return false;
    }
  }

  likeHandler(data) {
    this._data = data;
    // console.log(this._data)
    this._counterLike.textContent = this._data.likes.length;
    // console.log(this._elementLike)
    if (this.isLiked()) {
      this._elementLike.classList.add('element__like_active')
    } else {
      this._elementLike.classList.remove('element__like_active')
    }
  }

  _deleteIcon() {
    if (this._user._id !== this._data.owner._id) {
      this._element.querySelector('.element__trash').remove();
    }
  }

  _setEventListener() {
    this._deleteBtnCard = this._element.querySelector('.element__trash');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementImage = this._element.querySelector('.element__images');
    this._counterLike = this._element.querySelector('.element__counter');

    // console.log(this._counterLike)
    this._elementLike.addEventListener('click', () => {
      this._handleLiceCard(this._data._id)
    })

    this._deleteBtnCard.addEventListener('click', (e) => {
      const targ = e.target
      // targ.closest('.element__list').remove()
      this._handleDeleteCard(targ, this._data._id)
    })

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    })
  }
}


