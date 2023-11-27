import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { accountId: null },
	reducers: {
		setAccountId: (state, action) => {
			const { account_id } = action.payload;
			state.accountId = account_id;
		},
		logOut: (state) => {
			state.accountId = null;
		},
	},
});

export const { setAccountId, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getAccountId = (state: { auth: { accountId: string | null } }) =>
	state.auth.accountId;
