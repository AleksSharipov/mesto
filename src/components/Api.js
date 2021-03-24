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
      .catch(err => {
        return Promise.reject(err);
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
      .catch(err => {
        return Promise.reject(err);
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
      .catch(err => {
        return Promise.reject(err);
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
      .catch(err => {
        return Promise.reject(err);
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
      .catch(err => {
        Promise.reject(err)
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
      .catch(err => {
        return Promise.reject(err);
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
      .catch(err => {
        return Promise.reject(err);
      })
  }

  deliteLike(id) {
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
      .catch(err => {
        return Promise.reject(err);
      })
  }

  // editUserCard(name, userDescription) {
  //   return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this.token,
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       about: userDescription
  //     })
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  // }
}

/*
Токен: d1b254cd-47f5-43a0-a278-b7e222ba6292
Идентификатор группы: cohort-21

получить список всех карточек в виде массива (GET)
добавить карточку (POST)
удалить карточку (DELETE)
получить данные пользователя (GET)
заменить данные пользователя (PATCH)
заменить аватар (PATCH)
“залайкать” карточку (PUT)
удалить лайк карточки (DELETE)
*/
