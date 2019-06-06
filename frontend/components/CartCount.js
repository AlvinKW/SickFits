import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const AnimationStyles = styled.span`
	position: relative;

	.count {
		display: block;
		position: relative;
		backface-visibility: hidden;
		transition: all 0.4s;
	}

	.count-enter {
		transform: rotateX(0.5turn);
	}

	.count-enter-active {
		transform: rotateX(0);
	}

	.count-exit {
		position: absolute;
		top: 0;
		transform: rotateX(0);
	}

	.count-exit-active {
		transform: rotateX(0.5turn);
	}
`;

const Dot = styled.div`
	min-width: 3rem;
	margin-left: 1rem;
	padding: 0.5rem;
	border-radius: 50%;
	font-weight: 100;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
	line-height: 2rem;
	background: ${props => props.theme.red};
	color: white;
`;

function CartCount({ count }) {
	return (
		<AnimationStyles>
			<TransitionGroup>
				<CSSTransition
					key={count}
					className="count"
					classNames="count"
					timeout={{ enter: 400, exit: 400 }}
					unmountOnExit
				>
					<Dot>
						{count}
					</Dot>
				</CSSTransition>
			</TransitionGroup>
		</AnimationStyles>
	);
}

CartCount.propTypes = {
	count: PropTypes.number.isRequired,
};

export default CartCount;
