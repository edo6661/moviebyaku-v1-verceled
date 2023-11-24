import cn from './cn';

interface Variants {
	[key: string]: {
		[value: string]: string;
	};
}
interface StyleProps {
	[key: string]: string;
}

const variant = (base: string, variants: Variants) => {
	return function build(props: StyleProps) {
		const classes: string[] = [];

		Object.entries(props).map(([key, value]) => {
			if (!(key in variants)) return console.warn("can't find the key");
			classes.push(variants[key][value]);
		});
		return cn(base, ...classes);
	};
};

export default variant;
