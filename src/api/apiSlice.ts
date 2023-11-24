import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://api.themoviedb.org/3/',
	prepareHeaders: (headers) => {
		headers.set(
			'authorization',
			`Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
		);
	},
});

export const apiSlice = createApi({
	baseQuery: baseQuery,
	tagTypes: ['Movie', 'Series'],
	endpoints: () => ({}),
});
