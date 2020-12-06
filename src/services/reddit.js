const axios = require('axios')
const REDDIT_BASE_URL = 'https://www.reddit.com'

async function getTopPostsForChannel(subreddit) {
  try {
    const response = await axios.get(
      `${REDDIT_BASE_URL}/r/${subreddit}/top.json`,
      {
        params: {
          limit: 3,
          t: 'day',
        },
      }
    )
    const { data: reddits } = response.data
    return reddits.children
  } catch (e) {
    console.error(e)
    return ''
  }
}

module.exports = getTopPostsForChannel
