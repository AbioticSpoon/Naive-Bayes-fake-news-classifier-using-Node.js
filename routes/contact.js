const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// let msg = '';

router.get('/', (req, res) => {
	res.render('contact');
});

router.post('/', (req, res) => {
	let object = `
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>E-mail: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>
    `;

	async function main() {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				type: 'OAuth2',
				user: 'abioticspoon@gmail.com',
				clientId: process.env.clientId,
				clientSecret: process.env.clientSecret,
				refreshToken: process.env.refreshToken,
				accessToken: process.env.accessToken,
				expires: 1484314697598
			}
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Filter-Facts" <abioticspoon@gmail.com>', // sender address
			to: 'ajayvzachariah987@gmail.com', // list of receivers
			subject: 'Filter Facts Contact', // Subject line
			text: 'Someone would like to contact you', // plain text body
			html: object // html body
		});
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}

	main().catch(console.error);

	// msg = 'Thankyou for contacting us';
	// res.redirect('/');
	res.render('contact');
});

module.exports = router;
