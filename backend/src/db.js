// Connects to remote prisma db for querying
const { Prisma } = require('prisma-binding');

const db = new Prisma({
	typeDefs: __dirname + '/schema_prep.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	debug: false,
});

module.exports = db;
