import { useEffect } from 'react';
const useStatus = (status: Status | undefined, setStatus: SetStatus) => {
	useEffect(() => {
		if (status) {
			setStatus((prev) => {
				const newStatus = { ...prev };
				status.results.map((movie) => {
					newStatus[movie.id.toString()] = true;
				});
				return newStatus;
			});
		}
	}, [status]);
};
export const toggleStatus = (setStatus: SetStatus, account_id: string) => {
	setStatus((prev) => ({
		...prev,
		[account_id]: !prev[account_id],
	}));
};

export default useStatus;
