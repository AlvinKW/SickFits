require('dotenv').config();

const createServer = require('./createServer');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
// TODO Use express middleware to populate current user

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,
	},
}, details => {
	console.info(`[Server is Online] localhost:${details.port}`);
});
