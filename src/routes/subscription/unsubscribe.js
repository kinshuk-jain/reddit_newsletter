const db = require('../../modules/db')

const unsubscribeNewsletterHandler = (req, res) => {
  const { userid } = req.params
  try {
    db.updateNewsletterSubscription(userid, false)
    return res.status(200).send({
      status: 'ok',
      message: 'Unsubscribed from newsletter',
      id: userid,
    })
  } catch (e) {
    return res.status(400).send({
      status: 'error',
      message: 'Could not unsubscribe from newsletter',
      id: userid,
    })
  }
}

module.exports = unsubscribeNewsletterHandler
