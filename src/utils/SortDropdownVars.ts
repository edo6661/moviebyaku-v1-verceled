export const btnVars = {
	initial: {
		height: 60,
	},
	animate: {
		transition: {
			when: 'beforeChildren',
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
		height: 120,
	},
	dropdown: {
		transition: {
			when: 'beforeChildren',
			duration: 0.2,
			ease: [0.12, 0, 0.39, 0],
		},
		height: 230,
	},
};
export const contentVars = {
	initial: {
		y: 200,
		opacity: 0,
		blur: '8px',
	},
	animate: {
		y: 5,
		opacity: 1,
		blur: '0',
		transition: {
			delay: 0.2,
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		y: 200,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
		blur: '8px',
	},
};

export const sortingDropdownStuff = ['popularity.desc', 'vote_count.desc'];
