function generateTitle(subreddit) {
  return `<div style="border: 4px solid #000; color: #686d76; padding: 5px 20px; font-size: 28px; font-weight: bold;letter-spacing: 1px; margin-bottom: 5px;">
  ${subreddit}: <a href="https://www.reddit.com/r/${subreddit}/top/" style="font-size: 22px; text-decoration: none;">https://www.reddit.com/r/${subreddit}/top</a>
</div>`
}

function getScore(score) {
  if (score < 1000) {
    return score
  } else if (score > 1000 && score < 999499) {
    return Math.round(score / 1000) + 'k'
  } else {
    return Math.round(score / 1000000) + 'm'
  }
}

function generateNews(toplist) {
  // toplist is an array of top subreddit posts
  return toplist.reduce((acc, list) => {
    const { data = {} } = list
    return (
      acc +
      `
    <div style="margin: 20px 0;">
    <img alt="${
      data.subreddit
    }" style="width: 100%; max-height: 300px; min-height: 100px; margin-bottom: 5px;" src="${
        data.thumbnail
      }" />
    <div>
      <div style="border-radius: 50%; background: #ed8756; height: 100px; width: 100px; display: inline-block; vertical-align: top; color: #fff; font-weight: bold; line-height: 100px; text-align: center;">${getScore(
        data.score
      )}</div>
      <div style="display: inline-block; margin-left: 15px; margin-top: 20px;text-align: center; vertical-align: top; width: 80%">${
        data.title
      }</div>
    </div>
  </div>`
    )
  }, '')
}

function generateNewsletterHtml({ postList, name }) {
  let html = `<html>
  <head>
    <title></title>
  </head>
  <body style="font-family: sans-serif; margin: 0 20px; font-size: 24px;">
  <h1 style="color: #686d76; text-align: center; margin-bottom: 60px; font-size: 48px;">Reddit Newsletter</h1>
  <p style="color: #373a40;">Hello ${name}</p>
  <p style="color: #373a40;">See yesterday's top voted posts from your favorite channel</p>`
  
  html = Object.keys(postList).reduce((template, subreddit) => {
    return (
      template + `${generateTitle(subreddit)} ${generateNews(postList[subreddit])}`
    )
  }, html)
  html += `</body>
  </html>`
  return html
}

module.exports = generateNewsletterHtml
