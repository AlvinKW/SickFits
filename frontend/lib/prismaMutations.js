import gql from 'graphql-tag';

export const ADD_TO_CART_MUTATION = gql`
	mutation ADD_TO_CART_MUTATION($id: ID!) {
		addToCart(id: $id) {
			id
			quantity
		}
	}
`;

export const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION (
		$title: String!
		$description: String!
		$image: String
		$largeImage: String
		$price: Int!
	) {
		createItem(
			title: $title
			description: $description
			image: $image
			largeImage: $largeImage
			price: $price
		) {
			id
		}
	}
`;

export const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION($token: String!) {
		createOrder(token: $token) {
			id
			total
			charge
			items {
				id
				title
			}
		}
	}
`;

export const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

export const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

export const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

export const RESET_PASSWORD_MUTATION = gql`
	mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
		resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
			id
			name
			email
		}
	}
`;

export const SIGN_IN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			id
			name
			email
		}
	}
`;

export const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signOut {
			message
		}
	}
`;

export const SIGN_UP_MUTATION = gql`
	mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
		signUp(name: $name, email: $email, password: $password) {
			id
			name
			email
		}
	}
`;

export const TOGGLE_CART_MUTATION = gql`
	mutation TOGGLE_CART_MUTATION {
		toggleCart @client
	}
`;

export const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION (
		$id: ID!
		$title: String
		$description: String
		$price: Int
	) {
		updateItem(
			id: $id
			title: $title
			description: $description
			price: $price
		) {
			id
			title
			description
			price
		}
	}
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
	mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userID: ID!) {
		updatePermissions(permissions: $permissions, userID: $userID) {
			id
			name
			email
			permissions
		}
	}
`;
