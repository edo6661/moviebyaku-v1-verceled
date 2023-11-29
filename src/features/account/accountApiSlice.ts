import { apiSlice } from '../../api/apiSlice';

const accountApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		accountId: build.query<ResponseAccount, GetAccount>({
			query: ({ guest_session_id, session_id }) => {
				let url = `account`;
				if (session_id) {
					url += `?session_id=${session_id}`;
				} else if (guest_session_id) {
					url += `?guest_session_id=${guest_session_id}`;
				}
				return {
					url,
					// validateStatus: (response, result) => {
					// 	return response.status === 200 && !result.isError;
					// },
				};
			},
			// providesTags: (_result, _error, { session_id }) => [
			// 	{ type: 'Account', id: session_id },
			// ],
		}),
		guestSessionId: build.query<ResponseGuest, void>({
			query: () => ({
				url: 'authentication/guest_session/new',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: [{ type: 'Account', id: 'GUESTSESSIONID' }],
		}),
		requestToken: build.query<ResponseGuest, void>({
			query: () => ({
				url: 'authentication/token/new',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			// providesTags: [{ type: 'Account', id: 'REQUESTTOKEN' }],
		}),
		sessionId: build.mutation<ResponseSessionId, string>({
			query: (request_token) => ({
				url: 'authentication/session/new',
				method: 'POST',
				body: {
					request_token: request_token,
				},
			}),
			// invalidatesTags: [{ type: 'Account' }],
		}),
		deleteSessionId: build.mutation<Partial<ResponseSessionId>, string>({
			query: (sessionId) => ({
				url: 'authentication/session',
				method: 'DELETE',
				body: {
					session_id: sessionId,
				},
			}),
			// invalidatesTags: [{ type: 'Account' }],
		}),
	}),
});

export const {
	useAccountIdQuery,
	useGuestSessionIdQuery,
	useRequestTokenQuery,
	useSessionIdMutation,
	useDeleteSessionIdMutation,
} = accountApiSlice;
