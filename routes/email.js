var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/user', function(req, res, next) {
  res.render('index', { title: 'Mailer', status: req.query.status });
});

router.post('/user/send', (req, res) => {
  const {
    refresh_token,
    access_token,
  } = req.session.tokens;
 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'wangpeter588@gmail.com',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: refresh_token,
      accessToken: access_token,
    },
  });

  const mailOptions = {
    from: 'wangpeter588@gmail.com',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error sending email');
    } else {
      console.log(info);
      res.redirect('/email/user?status=success');
    }
  });
});

module.exports = router;