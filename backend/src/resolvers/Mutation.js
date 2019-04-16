const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
};

module.exports = Mutation;
