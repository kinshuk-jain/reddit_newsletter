const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail({ to, from, subject, userid, template }) {
  const msg = {
    to,
    from,
    subject,
    html: template,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent: ${userid}`)
    })
    .catch((error) => {
      console.error(`Could not send email for userid: ${userid}`)
      console.error(error)
    })
}

module.exports = sendEmail
