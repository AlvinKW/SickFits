const { forwardTo } = require('prisma-binding');

const { hasPermission } = require('../utils');

const Query = {
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	async me(parent, args, context, info) {
		if (!context.request.userID) {
			return null;
		}

		return await context.db.query.user({
			where: { id: context.request.userID },
		}, info);
	},
	async users(parent, args, context, info) {
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		hasPermission(context.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
		return await context.db.query.users({}, info);
	},
};

module.exports = Query;
