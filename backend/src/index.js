require('dotenv').config();

const cookieParser = require('cookie-parser');

const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());
// TODO Use express middleware to populate current user

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,
	},
}, details => {
	console.info(`[Server is Online] localhost:${details.port}`);
});
