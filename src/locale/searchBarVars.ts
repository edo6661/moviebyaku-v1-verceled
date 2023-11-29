const searchBarVars = {
	initial: {
		y: '-16px',
		opacity: 0,
	},
	animate: {
		y: '-1px',
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
		opacity: 1,
	},
	exit: {
		y: '-10px',
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
		opacity: 0,
	},
};

export default searchBarVars;
