const db = require('../../modules/db')

const subscribeNewsletterHandler = (req, res) => {
  const { userid } = req.params
  try {
    const { favorites } = db.getUser(userid)
    if (!favorites || !favorites.length) {
      return res.status(400).send({
        status: 'error',
        message: 'Could not subscribe to newsletter, no favorite subreddits',
        id: userid,
      })
    }
    db.updateNewsletterSubscription(userid, true)
    return res
      .status(200)
      .send({ status: 'ok', message: 'Subscribed to newsletter', id: userid })
  } catch (e) {
    return res.status(400).send({
      status: 'error',
      message: 'Could not subscribe to newsletter',
      id: userid,
    })
  }
}

module.exports = subscribeNewsletterHandler
