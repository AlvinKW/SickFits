const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');

const Mutation = {
	async createItem(parent, args, context, info) {
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		return await context.db.mutation.createItem({
			data: {
				...args,
				user: {
					connect: { id: context.request.userID },
				},
			},
		}, info);
	},
	async updateItem(parent, args, context, info) {
		const updatedItem = { ...args };
		delete updatedItem.id;

		return await context.db.mutation.updateItem({
			data: updatedItem,
			where: { id: args.id },
		}, info);
	},
	async deleteItem(parent, args, context, info) {
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		const where = { id: args.id };
		const item = await context.db.query.item({ where }, '{ id title user { id } }');

		const ownsItem = item.user.id === context.request.userID;
		const hasPermissions = context.request.user.permissions.some(permission => {
			return ['ADMIN', 'ITEMDELETE'].includes(permission);
		});

		if (!ownsItem && !hasPermissions) {
			throw new Error('You do not have permission to do that!');
		}

		return await context.db.mutation.deleteItem({ where }, info);
	},
	async signUp(parent, args, context, info) {
		args.email = args.email.toLowerCase();
		const password = await bcrypt.hash(args.password, 10);

		const user = await context.db.mutation.createUser({
			data: {
				...args,
				password,
				permissions: { set: ['USER'] },
			},
		}, info);

		const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
		context.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return user;
	},
	async signIn(parent, { email, password }, context, info) {
		const user = await context.db.query.user({ where: { email } }, info);
		if (!user) {
			throw new Error(`No such user found for email: ${email}`);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password!');
		}

		const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
		context.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return user;
	},
	signOut(parent, args, context) {
		context.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async requestReset(parent, args, context) {
		const user = await context.db.query.user({
			where: { email: args.email },
		});
		if (!user) {
			throw new Error(`No such user found for email: ${args.email}`);
		}

		const randomBytesPromise = promisify(randomBytes);
		const resetToken = (await randomBytesPromise(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; // 1 Hour
		await context.db.mutation.updateUser({
			data: { resetToken, resetTokenExpiry },
			where: { email: args.email },
		});

		await transport.sendMail({
			from: 'kazi@kazijawad.com',
			to: user.email,
			subject: 'SickFits Password Reset',
			html: makeANiceEmail(`
				Your Password Reset Token:
				\n\n
				<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset</a>
			`),
		});

		return { message: 'Check your email for a reset link!' };
	},
	async resetPassword(parent, args, context, info) {
		if (args.password !== args.confirmPassword) {
			throw new Error('The passwords don\'t match!');
		}

		const [user] = await context.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000,
			},
		});
		if (!user) {
			throw new Error('This token is either invalid or expired!');
		}

		const password = await bcrypt.hash(args.password, 10);
		const updatedUser = await context.db.mutation.updateUser({
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null,
			},
			where: { email: user.email },
		}, info);

		const token = jwt.sign({ userID: updatedUser.id }, process.env.APP_SECRET);
		context.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return updatedUser;
	},
	async updatePermissions(parent, args, context, info) {
		if (!context.request.userID) {
			throw new Error('You must be logged in to do that!');
		}

		const currentUser = await context.db.query.user({
			where: { id: context.request.userID },
		});

		hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

		return await context.db.mutation.updateUser({
			data: {
				permissions: { set: args.permissions },
			},
			where: { id: args.userID },
		}, info);
	},
	async addToCart(parent, args, context, info) {
		const { userID } = context.request;
		if (!userID) {
			throw new Error('You must be logged in to do that!');
		}

		const [existingCartItem] = await context.db.query.cartItems({
			item: { id: args.id },
			user: { id: userID },
		});

		if (existingCartItem) {
			return context.db.mutation.updateCartItem({
				where: { id: existingCartItem.id },
				data: { quantity: existingCartItem.quantity + 1 },
			});
		}

		return await context.db.mutation.createCartItem({
			data: {
				item: {
					connect: { id: args.id },
				},
				user: {
					connect: { id: userID },
				},
			},
		}, info);
	},
};

module.exports = Mutation;
