require('dotenv').config();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		const { userID } = jwt.verify(token, process.env.APP_SECRET);
		req.userID = userID;
	}

	next();
});

server.express.use(async(req, res, next) => {
	if (!req.userID) { return next(); }

	const user = await db.query.user({
		where: { id: req.userID },
	}, '{ id, name, email, permissions }');

	req.user = user;
	next();
});

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,
	},
}, details => {
	console.info(`[Server is Online] localhost:${details.port}`);
});
