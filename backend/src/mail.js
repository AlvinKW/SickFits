const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const makeANiceEmail = text => `
	<div className="email" style="
		padding: 20px;
		border: 1px solid black;
		font-family: serif;
		font-size: 20px;
		line-height: 2;
	">
		<h2>Hello,</h2>
		<p>${text}</p>
		<p>Thank you,</p>
		<p>SickFits Team</p>
	</div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
