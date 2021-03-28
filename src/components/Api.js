export default class Api {
  constructor(token, cohortId) {
    this.token = token;
    this.cohortId = cohortId;
  }



  getCard() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
      })
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
      })
  }

  createCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
      })
  }

  renameUserInfo(newName, newAbout) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
      })
  }

  newUserAvatar(linkNewAvatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkNewAvatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`));
      })
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
      })
  }

  likeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
        }
      })
  }

  deleteLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(new Error(`Шэф, усё пропало ${res.status}`))
        }
      })
  }

}
