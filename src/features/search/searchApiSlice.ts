/* eslint-disable no-mixed-spaces-and-tabs */
import { apiSlice } from '../../api/apiSlice';

const searchApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		searchCollection: build.query<CollectionSearchData, string>({
			query: (keyword) => ({
				url: `search/collection?query=${keyword}`,
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((search) => ({
								type: 'Search' as const,
								id: search.id,
							})),
							{ type: 'Search', id: 'COLLECTION' },
					  ]
					: [{ type: 'Search', id: 'COLLECTION' }],
		}),
		searchMovie: build.query<MovieSearchData, string>({
			query: (keyword) => ({
				url: `search/movie?query=${keyword}`,
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((search) => ({
								type: 'Search' as const,
								id: search.id,
							})),
							{ type: 'Search', id: 'MOVIE' },
					  ]
					: [{ type: 'Search', id: 'MOVIE' }],
		}),
		searchTv: build.query<TvSearchData, string>({
			query: (keyword) => ({
				url: `search/tv?query=${keyword}`,
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((search) => ({
								type: 'Search' as const,
								id: search.id,
							})),
							{ type: 'Search', id: 'TV' },
					  ]
					: [{ type: 'Search', id: 'TV' }],
		}),
		searchPerson: build.query<PersonSearchData, string>({
			query: (keyword) => ({
				url: `search/person?query=${keyword}`,
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((search) => ({
								type: 'Search' as const,
								id: search.id,
							})),
							{ type: 'Search', id: 'PERSON' },
					  ]
					: [{ type: 'Search', id: 'PERSON' }],
		}),
		searchMulti: build.query<DataMulti, { query: string; page: string }>({
			query: ({ query, page }) => ({
				url: `search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
				validateStatus: (res, resu) => {
					return res.status === 200 && !resu.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((movie) => ({
								type: 'Search' as const,
								id: movie.id,
							})),
							{ type: 'Search', id: 'SEARCHMULTI' },
					  ]
					: [{ type: 'Search', id: 'SEARCHMULTI' }],
		}),
	}),
});

export const {
	useSearchCollectionQuery,
	useSearchMovieQuery,
	useSearchTvQuery,
	useSearchPersonQuery,
	useSearchMultiQuery,
} = searchApiSlice;
