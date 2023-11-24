import { useEffect } from 'react';

const useTitle = (title: string) => {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title;
		return () => {
			document.title = prevTitle;
			return undefined;
		};
	}, [title]);
};

export default useTitle;
