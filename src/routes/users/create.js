const db = require('../../modules/db')
const { v4: uuidv4 } = require('uuid')

const createUserHandler = (req, res) => {
  const id = uuidv4()
  const userData = req.body
  try {
    db.addUser(id, userData)
    if (userData.subscribe && userData.favorites && userData.favorites.length) {
      db.addToSubscriberList(id)
    }
    return res.status(200).send({ status: 'ok', message: 'user created', id })
  } catch (e) {
    console.error(e)
    return res
      .status(400)
      .send({ status: 'error', message: 'Could not create user' })
  }
}

module.exports = createUserHandler
