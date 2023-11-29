export const buttonVars = {
	open: {
		rotate: 90,
		transition: {
			duration: 0.1,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	close: {
		rotate: 0,
		transition: {
			duration: 0.1,
			ease: [0.12, 0, 0.39, 0],
		},
	},
};

export const containerMobile = {
	initial: {
		right: '-15rem',
	},
	open: {
		right: '0',
		opacity: [0.2, 0.4, 0.6, 0.8, 1],
		transition: {
			delay: 0.1,
			duration: 0.3,
		},
	},
	exit: {
		right: '-15rem',
		opacity: [1, 0.8, 0.5, 0.3, 0],
		transition: {
			delay: 0.1,
			duration: 0.3,
		},
	},
};
