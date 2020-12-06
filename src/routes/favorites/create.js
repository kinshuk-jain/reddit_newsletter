const db = require('../../modules/db')

const addFavoriteHandler = (req, res) => {
  const { userid } = req.params
  const { favorites } = req.body
  try {
    /**
     * We allow updating favorites while user is subscribed to newsletter
     */
    db.addFavorite(userid, favorites)
    return res
      .status(200)
      .send({ status: 'ok', message: 'Added favorites', id: userid })
  } catch (e) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Could not add favorites', id: userid })
  }
}

module.exports = addFavoriteHandler
