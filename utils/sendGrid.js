// Node Package
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')

const Email = require('email-templates')

const email = new Email({
  message: {
    from: 'thong.lu@dfo.global',
  },
  send: true,
})

const sg_options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
}

const transporter = nodemailer.createTransport(sendGridTransport(sg_options))

/** Util use for send email from sendGrid Third Party
 * @param {String} endpointEmail The email need to receive content
 * @param {String} subject Subject - Mail title
 * @param {String} html  HTML structure content of email
 * @param {Function} callback Function will run after email send
 */
module.exports.sendGridTo = (userEmail, subject, html, callback) => {
  const sendingTemp = {
    from: 'thong.lu@dfo.global',
    to: userEmail,
    subject,
    html,
  }
  // email.send({
  //   template: 'mars',
  //   message: {
  //     to: userEmail,
  //   },
  //   locals: {
  //     name: 'Lmint3010',
  //     directLink: '/hellolmint',
  //   },
  // })
  transporter.sendMail(sendingTemp, err => {
    if (err) return false
    callback()
  })
}
