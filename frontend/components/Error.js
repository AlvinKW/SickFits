import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
	margin: 2rem 0;
	padding: 2rem;
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-left: 5px solid red;
	background: white;

	p {
		margin: 0;
		font-weight: 100;
	}
`;

function Error({ error }) {
	if (!error || !error.message) { return null; }
	if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
		return error.networkError.result.errors.map((error, i) => (
			<ErrorStyles key={i}>
				<p data-test="graphql-error">
					<strong>Shoot!&nbsp;</strong>
					{error.message.replace('GraphQL error: ', '')}
				</p>
			</ErrorStyles>
		));
	}

	return (
		<ErrorStyles>
			<p data-test="graphql-error">
				<strong>Shoot!&nbsp;</strong>
				{error.message.replace('GraphQL error: ', '')}
			</p>
		</ErrorStyles>
	);
}

Error.defaultProps = {
	error: {},
};

Error.propTypes = {
	error: PropTypes.object,
};

export default Error;
