const db = require('../../modules/db')

const listUserHandler = (req, res) => {
  return res.status(200).send({ status: 'ok', results: db.listUsers() })
}

module.exports = listUserHandler
