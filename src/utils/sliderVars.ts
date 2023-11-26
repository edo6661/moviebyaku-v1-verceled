export const scrollerVars = {
	initial: {
		opacity: 0.3,
		display: 'hidden',
	},
	animation: {
		opacity: 1,
		display: 'flex',
		transition: {
			delay: 0.1,
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		display: 'hidden',
		opacity: 0,
		duration: 0.3,
		delay: 0.1,
		ease: [0.12, 0, 0.39, 0],
	},
};
export const optionVars = {
	initial: {
		scale: 0.9,
		opacity: 0.8,
		backgroundColor: '#DFE8F1',
	},
	hover: {
		transition: {
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
		opacity: 1,
		scale: 1,
	},
	exit: {
		transition: {
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
		opacity: 1,
		scale: 0.8,
	},
};
export const imageVars = {
	initial: {
		filter: 'blur(0px)',
		// opacity: 1,
	},
	animation: {
		filter: 'blur(4px)',
		transition: {
			duration: 0.1,
			ease: [0.12, 0, 0.39, 0],
		},
		// opacity: 0.3,
	},
	exit: {
		filter: 'blur(0px)',
		transition: {
			duration: 0.1,
			ease: [0.12, 0, 0.39, 0],
		},
		// opacity: 1,
	},
};
export const appearedCardVars = {
	initial: {
		opacity: 0,
		height: 0,
		width: 0,
	},
	animation: {
		opacity: 1,
		height: 'auto',
		width: 'auto',
		transition: {
			delay: 0.1,
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		delay: 0.1,
		opacity: 0,
		height: 0,
		width: 0,
		transition: {
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
	},
};
