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
		font-family: sans-serif;
		font-size: 20px;
		line-height: 2;
	">
		<h2>Hello There!</h2>
		<p>${text}</p>

		<p>- Kazi Jawad</p>
	</div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
