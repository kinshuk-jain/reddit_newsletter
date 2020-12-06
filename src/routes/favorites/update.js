const db = require('../../modules/db')

const updateFavoriteHandler = (req, res) => {
  const { userid } = req.params
  const { favorites } = req.body
  try {
    db.updateFavorite(userid, favorites)
    return res
      .status(200)
      .send({ status: 'ok', message: 'Updated favorites', id: userid })
  } catch (e) {
    return res.status(400).send({
      status: 'error',
      message: 'Could not update favorites',
      id: userid,
    })
  }
}

module.exports = updateFavoriteHandler
