const db = require('../modules/db')
const sendEmail = require('../modules/email')
const generateNewsletterHtml = require('../modules/email/templates/newsletter-template')
const getTopPostsForChannel = require('./reddit')

// Newsletter time of day in 24 hour format
const NEWSLETTER_TIME = {
  HOURS: 8, // hours
  MINUTES: 0, // minutes
}

const cache = {}

// returns number of milliseconds to wait for next NEWSLETTER
function getNextInterval() {
  const date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()
  let nextInterval = 0

  if (h === NEWSLETTER_TIME.HOURS && m < NEWSLETTER_TIME.MINUTES) {
    nextInterval = (NEWSLETTER_TIME.MINUTES - m) * 60
  } else {
    nextInterval = (NEWSLETTER_TIME.MINUTES + (60 - m)) * 60

    if (h + 1 > NEWSLETTER_TIME.HOURS) {
      nextInterval += (24 - (h + 1) + NEWSLETTER_TIME.HOURS) * 3600
    } else {
      nextInterval += (NEWSLETTER_TIME.HOURS - (h + 1)) * 3600
    }
  }

  return nextInterval * 1000
}

async function createNewsLetter(id) {
  const { favorites, name, email } = db.getUser(id)
  if (favorites && favorites.length) {
    const postList = {}
    for (const fav of favorites) {
      if (!cache[fav]) {
        const topPosts = await getTopPostsForChannel(fav)
        if (topPosts) {
          cache[fav] = topPosts
        }
      }
      if (cache[fav]) {
        postList[fav] = cache[fav]
      }
    }
    return {
      id,
      name,
      userEmail: email,
      postList,
    }
  }
  return {}
}

function sendNewsLetter({ id, name, userEmail, postList }) {
  if (!Object.keys(postList).length) {
    // do not send email if no posts in favorites
    // Can also send a no new updates email as newsletter
    return
  }
  sendEmail({
    to: userEmail,
    subject: 'Reddit Newsletter',
    from: 'kinshuk2jain@gmail.com',
    userid: id,
    template: generateNewsletterHtml({
      postList,
      name,
    }),
  })
}

function newsletterService() {
  setTimeout(async () => {
    const subscribers = db.getSubscriberList()
    for (const subId of subscribers) {
      const result = await createNewsLetter(subId)
      if (result.postList) {
        sendNewsLetter(result)
      }
    }

    newsletterService()
  }, getNextInterval())
}

module.exports = newsletterService
