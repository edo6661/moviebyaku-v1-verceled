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
		ratedMovies: builder.query<RatedData, { page: string; accountId: string }>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/rated/movie?language=en-US&page=${page}&sort_by=created_at.asc`,
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
		getWatchlistMovie: builder.query<
			RatedData,
			{ page: string; accountId: string }
		>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/watchlist/movie?language=en-US&page=${page}&sort_by=created_at.asc`,
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
								{ type: 'Movie', id: 'WATCHLIST' }
							),
					  ]
					: [{ type: 'Movie', id: 'WATCHLIST' }],
		}),
		getFavoriteMovie: builder.query<
			FavoriteResponse,
			{ page: string; accountId: string }
		>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/favorite/movie?language=en-US&page=${page}&sort_by=created_at.asc`,
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
								{ type: 'Movie', id: 'FAVORITE' }
							),
					  ]
					: [{ type: 'Movie', id: 'FAVORITE' }],
		}),
		genresMovie: builder.query<FavoriteResponse, void>({
			query: () => ({
				url: `genre/movie/list?language=en`,
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
								{ type: 'Movie', id: 'GENRES' }
							),
					  ]
					: [{ type: 'Movie', id: 'GENRES' }],
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
		RecomsMovie: builder.query<MovieRecommendationData, string>({
			query: (id) => ({
				url: `movie/${id}/recommendations`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `Recoms${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ReviewsMovie: builder.query<ReviewsData, string>({
			query: (id) => ({
				url: `movie/${id}/reviews`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `Reviews${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		VideosMovie: builder.query<MovieVideosData, string>({
			query: (id) => ({
				url: `movie/${id}/videos`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `Videos${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		AlterTitleMovie: builder.query<AlternativeTitlesData, string>({
			query: (id) => ({
				url: `movie/${id}/alternative_titles`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `AlterTitle${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		CreditsMovie: builder.query<CreditsData, string>({
			query: (id) => ({
				url: `movie/${id}/credits`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `Credits${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ImagesMovie: builder.query<ImageData, string>({
			query: (id) => ({
				url: `movie/${id}/images`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Movie', id: `Images${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		favoriteMovie: builder.mutation<ResponsePOST, AddFavorite>({
			query: ({ account_id, media_type, media_id, favorite }) => ({
				url: `account/${account_id}/favorite`,
				method: 'POST',
				body: {
					media_type,
					media_id,
					favorite,
				},
			}),
			invalidatesTags: [{ type: 'Movie' }],
		}),
		watchListMovie: builder.mutation<ResponsePOST, AddWatchList>({
			query: ({ account_id, media_type, media_id, watchlist }) => ({
				url: `account/${account_id}/watchlist`,
				method: 'POST',
				body: {
					media_type,
					media_id,
					watchlist,
				},
			}),
			invalidatesTags: [{ type: 'Movie' }],
		}),
		ratingMovie: builder.mutation<ResponsePOST, AddRating>({
			query: ({ id, session_id, guest_session_id, value }) => {
				let url = `movie/${id}/rating`;
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
					method: 'POST',
					body: {
						value,
					},
					validateStatus: (response, result) => {
						return response.status === 201 && !result.isError;
					},
				};
			},
			invalidatesTags: [{ type: 'Movie' }],
		}),
		removeRatingMovie: builder.mutation<ResponsePOST, DeleteRating>({
			query: ({ id, session_id, guest_session_id }) => {
				let url = `movie/${id}/rating`;
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
					method: 'DELETE',
					validateStatus: (response, result) => {
						return response.status === 201 && !result.isError;
					},
				};
			},
			invalidatesTags: [{ type: 'Movie' }],
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
	useReviewsMovieQuery,
	useRecomsMovieQuery,
	useVideosMovieQuery,
	useAlterTitleMovieQuery,
	useCreditsMovieQuery,
	useImagesMovieQuery,
	useFavoriteMovieMutation,
	useWatchListMovieMutation,
	useRatingMovieMutation,
	useRemoveRatingMovieMutation,
	useRatedMoviesQuery,
	useGetWatchlistMovieQuery,
	useGetFavoriteMovieQuery,
	useGenresMovieQuery,
} = movieApiSlice;
