import { apiSlice } from '../../api/apiSlice';

const accountApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		accountId: build.query<ResponseAccount, GetAccount>({
			query: ({ guest_session_id, session_id }) => {
				let url = `account`;
				if (!session_id && !guest_session_id) {
					throw new Error('must have either session_id or guest_session_id');
				}
				if (session_id) {
					url += `?session_id=${session_id}`;
				} else if (guest_session_id) {
					url += `?guest_session_id=${guest_session_id}`;
				}
				return {
					url,
					validateStatus: (response, result) => {
						return response.status === 200 && !result.isError;
					},
				};
			},
		}),
		guestSessionId: build.query<ResponseGuest, void>({
			query: () => ({
				url: 'authentication/guest_session/new',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
		}),
		requestToken: build.query<ResponseGuest, void>({
			query: () => ({
				url: 'authentication/token/new',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
		}),
		sessionId: build.query<ResponseGuest, void>({
			query: () => ({
				url: 'authentication/session/new',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
		}),
	}),
});

export const {
	useAccountIdQuery,
	useGuestSessionIdQuery,
	useRequestTokenQuery,
	useSessionIdQuery,
} = accountApiSlice;
