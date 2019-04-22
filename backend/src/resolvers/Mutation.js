const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const Mutation = {
	async createItem(parent, args, ctx, info) {
		// TODO Check if they are logged in

		const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
		return item;
	},
	updateItem(parent, args, ctx, info) {
		const updates = { ...args };
		delete updates.id;

		return ctx.db.mutation.updateItem({
			data: updates,
			where: { id: args.id },
		}, info);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// const item = await ctx.db.query.item({ where }, `{ id title }`);
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	async signUp(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		const password = await bcrypt.hash(args.password, 10);

		const user = await ctx.db.mutation.createUser({
			data: {
				...args,
				password,
				permissions: { set: ['USER'] },
			},
		}, info);

		const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return user;
	},
	async signIn(parent, { email, password }, ctx) {
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`No such user found for email: ${email}`);
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password!');
		}

		const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return user;
	},
	signOut(parent, args, ctx) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async requestReset(parent, args, ctx) {
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`No such user found for email: ${args.email}`);
		}

		const randomBytesPromise = promisify(randomBytes);
		const resetToken = (await randomBytesPromise(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; // 1 Hour
		await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry },
		});

		return { message: 'Check your email for a reset link!' };
	},
	async resetPassword(parent, args, ctx) {
		if (args.password !== args.confirmPassword) {
			throw new Error('The passwords don\'t match!');
		}

		const [user] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000,
			},
		});
		if (!user) {
			throw new Error('This token is either invalid or expired!');
		}

		const password = await bcrypt.hash(args.password, 10);
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});

		const token = jwt.sign({ userID: updatedUser.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year Cookie
		});

		return updatedUser;
	},
};

module.exports = Mutation;
