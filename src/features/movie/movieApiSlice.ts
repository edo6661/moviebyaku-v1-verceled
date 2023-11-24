/* eslint-disable no-mixed-spaces-and-tabs */
import { apiSlice } from '../../api/apiSlice';

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		popularMovies: builder.query<FirstSectionMovie, number | null>({
			query: (page) => ({
				url: `movie/popular?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((movie) => ({
								type: 'Movie' as const,
								id: movie.id,
							})),
							{ type: 'Movie', id: 'POPULAR' },
					  ]
					: [{ type: 'Movie', id: 'POPULAR' }],
		}),

		trendingMoviesWeek: builder.query<FirstSectionMovie, number>({
			query: (page) => ({
				url: `trending/movie/week?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((movie) => ({
								type: 'Movie' as const,
								id: movie.id,
							})),
							{ type: 'Movie', id: 'WEEK' },
					  ]
					: [{ type: 'Movie', id: 'WEEK' }],
		}),
		trendingMoviesDay: builder.query<FirstSectionMovie, number>({
			query: (page) => ({
				url: `trending/movie/day?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((movie) => ({
								type: 'Movie' as const,
								id: movie.id,
							})),
							{ type: 'Movie', id: 'DAY' },
					  ]
					: [{ type: 'Movie', id: 'DAY' }],
		}),
		topRatedMovies: builder.query<FirstSectionMovie, number>({
			query: (page) => ({
				url: `movie/top_rated?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(movie) => ({
									type: 'Movie' as const,
									id: movie.id,
								}),
								{ type: 'Movie', id: 'TOPRATED' }
							),
					  ]
					: [{ type: 'Movie', id: 'TOPRATED' }],
		}),
		nowPlayingMovies: builder.query<FirstSectionMovie, number>({
			query: (page) => ({
				url: `movie/now_playing?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(movie) => ({
									type: 'Movie' as const,
									id: movie.id,
								}),
								{ type: 'Movie', id: 'NOWPLAYING' }
							),
					  ]
					: [{ type: 'Movie', id: 'NOWPLAYING' }],
		}),
		upComingMovies: builder.query<FirstSectionMovie, number>({
			query: (page) => ({
				url: `movie/upcoming?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(movie) => ({
									type: 'Movie' as const,
									id: movie.id,
								}),
								{ type: 'Movie', id: 'UPCOMING' }
							),
					  ]
					: [{ type: 'Movie', id: 'UPCOMING' }],
		}),
		MovieById: builder.query<MovieDetails, string>({
			query: (id) => ({
				url: `movie/${id}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
	}),
});

export const {
	usePopularMoviesQuery,
	useUpComingMoviesQuery,
	useTopRatedMoviesQuery,
	useNowPlayingMoviesQuery,
	useTrendingMoviesDayQuery,
	useTrendingMoviesWeekQuery,
	useMovieByIdQuery,
} = movieApiSlice;
