import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
// ! digunakan untuk membuat query dasar yang akan digunakan oleh semua endpoint API kita
const baseQuery = fetchBaseQuery({
	// ! credentials include jika ingin mengirim cookie
	baseUrl: 'https://api.themoviedb.org/3/',
	// !prepareHeaders (fungsi untuk mempersiapkan header sebelum request dikirim).
	prepareHeaders: (headers) => {
		headers.set(
			'authentication',
			`Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
		);
		return headers;
	},
});

const apiSlice = createApi({
	baseQuery,
	// ! setiap request ke tags Movie / Series akan di invalidate ulang
	tagTypes: ['Movie', 'Series'],
	endpoints: () => ({}),
});

export default apiSlice;
