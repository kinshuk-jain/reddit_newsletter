module.exports = (() => {
  const db = {
    user: {},
    // Different ways to store this, but due to lack of context on scale and requirements
    // using this as a key-value pair
    subscriberList: {},
  }

  const userValidation = (user) => {
    if (user === null || typeof user !== 'object') {
      throw 'invalid user object'
    }
  }

  const favoriteValidation = (favorites) => {
    if (!Array.isArray(favorites) || !favorites.length) {
      throw 'favorites should be a string array'
    }
  }

  const idValidation = (id) => {
    if (!db.user[id]) {
      throw 'user does not exist'
    }
  }

  return {
    addUser: (id, user) => {
      // user should already be a non-empty object as body validator validates this
      // but validating it again to make it independent of body validation
      userValidation(user)
      db.user[id] = user
    },
    updateUser: (id, user) => {
      idValidation(id)
      userValidation(user)
      db.user[id] = user
    },
    getUser: (id) => {
      return db.user[id]
    },
    listUsers: () => {
      let userList = {}
      Object.keys(db.user).forEach((id) => {
        userList[id] = db.user[id].name
      })
      return userList
    },
    updateFavorite: (id, favorites) => {
      idValidation(id)
      favoriteValidation(favorites)
      db.user[id].favorites = favorites
    },
    addFavorite: (id, favorites) => {
      idValidation(id)
      // favorites should already be a non-empty array as body validator validates this
      // but validating it again to make it independent of body validation
      favoriteValidation(favorites)
      db.user[id].favorites = (db.user[id].favorites || []).concat(favorites)
    },
    getSubscriberList: () => {
      return Object.keys(db.subscriberList)
    },
    updateNewsletterSubscription: (id, subscribe) => {
      idValidation(id)
      if (!typeof subscribe === 'boolean') {
        throw 'second argument must be boolean'
      }
      db.user[id].subscribe = subscribe
    },
    addToSubscriberList: (id) => {
      db.subscriberList[id] = true
    },
    removeFromSubscriberList: (id) => {
      if (db.subscriberList[id]) {
        delete db.subscriberList[id]
      }
    },
  }
})()
