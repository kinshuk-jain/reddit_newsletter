const db = require('../../modules/db')

const updateUserHandler = (req, res) => {
  const { userid } = req.params
  const userData = req.body
  try {
    db.updateUser(userid, userData)
    if (userData.subscribe && userData.favorites && userData.favorites.length) {
      db.addToSubscriberList(userid)
    } else if (userData.subscribe === false) {
      db.removeFromSubscriberList(userid)
    }
    return res
      .status(200)
      .send({ status: 'ok', message: 'Successfully updated user', id: userid })
  } catch (e) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Could not update user', id: userid })
  }
}

module.exports = updateUserHandler
