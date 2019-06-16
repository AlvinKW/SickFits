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
	async order(parent, args, context, info) {
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		const order = await context.db.query.order({
			where: { id: args.id },
		}, info);

		const ownsOrder = order.user.id === context.request.userID;
		const hasPermissionToSeeOrder = context.request.user.permissions.includes('ADMIN');
		if (!ownsOrder || !hasPermissionToSeeOrder) {
			throw new Error('You do not have permission to do that!');
		}

		return order;
	},
	async orders(parent, args, context, info) {
		const { userID } = context.request;
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		return context.db.query.orders({
			where: {
				user: { id: userID },
			},
		}, info);
	},
};

module.exports = Query;
