import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { sessionId: null },
	reducers: {
		setSessionId: (state, action) => {
			const { session_id } = action.payload;
			state.sessionId = session_id;
		},
		logOut: (state) => {
			state.sessionId = null;
		},
	},
});

export const { setSessionId, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectSessionId = (state: {
	auth: { sessionId: string | null };
}) => state.auth.sessionId;
