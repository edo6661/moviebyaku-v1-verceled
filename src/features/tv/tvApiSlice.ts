/* eslint-disable no-mixed-spaces-and-tabs */
import { apiSlice } from '../../api/apiSlice';

export const tvApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		popularTv: builder.query<PopularTvResult, number | null>({
			query: (page) => ({
				url: `tv/popular?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((tv) => ({
								type: 'Tv' as const,
								id: tv.id,
							})),
							{ type: 'Tv', id: 'POPULAR' },
					  ]
					: [{ type: 'Tv', id: 'POPULAR' }],
		}),
		topRatedTv: builder.query<ResultTopRatedTv, number>({
			query: (page) => ({
				url: `tv/top_rated?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((tv) => ({
								type: 'Tv' as const,
								id: tv.id,
							})),
							{ type: 'Tv', id: 'TOPRATED' },
					  ]
					: [{ type: 'Tv', id: 'TOPRATED' }],
		}),
		onTheAirTv: builder.query<ResultOnTheAirTv, number>({
			query: (page) => ({
				url: `tv/on_the_air?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((tv) => ({
								type: 'Tv' as const,
								id: tv.id,
							})),
							{ type: 'Tv', id: 'ONTHEAIR' },
					  ]
					: [{ type: 'Tv', id: 'ONTHEAIR' }],
		}),
		airingTodayTv: builder.query<ResultOnTheAirTv, number>({
			query: (page) => ({
				url: `tv/airing_today?language=en-US&page=${page}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'AIRINGTODAY' }
							),
					  ]
					: [{ type: 'Tv', id: 'AIRINGTODAY' }],
		}),
		tvById: builder.query<ResultByIdTv, string>({
			query: (id) => ({
				url: `tv/${id}?language=en-US`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [{ type: 'Tv', id }],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ReviewsTv: builder.query<ReviewsData, string>({
			query: (id) => ({
				url: `tv/${id}/reviews`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `Reviews${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		RecomsTv: builder.query<TvRecommendationData, string>({
			query: (id) => ({
				url: `tv/${id}/recommendations`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `Recoms${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		VideosTv: builder.query<TvVideosData, string>({
			query: (id) => ({
				url: `tv/${id}/videos`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `Videos${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		AlterTitleTv: builder.query<AlternativeTitlesData, string>({
			query: (id) => ({
				url: `tv/${id}/alternative_titles`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `AlterTitle${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		CreditsTv: builder.query<CreditsData, string>({
			query: (id) => ({
				url: `tv/${id}/credits`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `Credits${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ImagesTv: builder.query<ImageData, string>({
			query: (id) => ({
				url: `tv/${id}/images`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'Tv', id: `Images${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		favoriteTv: builder.mutation<ResponsePOST, AddFavorite>({
			query: ({ account_id, media_type, media_id, favorite }) => ({
				url: `account/${account_id}/favorite`,
				method: 'POST',
				body: {
					media_type,
					media_id,
					favorite,
				},
			}),
			invalidatesTags: [{ type: 'Tv' }],
		}),
		watchListTv: builder.mutation<ResponsePOST, AddFavorite>({
			query: ({ account_id, media_type, media_id, favorite }) => ({
				url: `account/${account_id}/watchlist`,
				method: 'POST',
				body: {
					media_type,
					media_id,
					favorite,
				},
			}),
			invalidatesTags: [{ type: 'Tv' }],
		}),
		ratingTv: builder.mutation<ResponsePOST, AddRating>({
			query: ({ id, session_id, guest_session_id, value }) => {
				let url = `tv/${id}/rating`;
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
			invalidatesTags: [{ type: 'Tv' }],
		}),
		removeRatingTv: builder.mutation<ResponsePOST, DeleteRating>({
			query: ({ id, session_id, guest_session_id }) => {
				let url = `tv/${id}/rating`;
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
			invalidatesTags: [{ type: 'Tv' }],
		}),
		ratedTv: builder.query<RatedData, { page: string; accountId: string }>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/rated/tv?language=en-US&page=${page}&sort_by=created_at.asc`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'RATED' }
							),
					  ]
					: [{ type: 'Tv', id: 'RATED' }],
		}),
		getWatchlistTv: builder.query<
			RatedData,
			{ page: string; accountId: string }
		>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/watchlist/tv?language=en-US&page=${page}&sort_by=created_at.asc`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'WATCHLIST' }
							),
					  ]
					: [{ type: 'Tv', id: 'WATCHLIST' }],
		}),
		getFavoriteTv: builder.query<
			FavoriteResponse,
			{ page: string; accountId: string }
		>({
			query: ({ page, accountId }) => ({
				url: `account/${accountId}/favorite/tv?language=en-US&page=${page}&sort_by=created_at.asc`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'FAVORITE' }
							),
					  ]
					: [{ type: 'Tv', id: 'FAVORITE' }],
		}),
		genresTv: builder.query<FavoriteResponse, void>({
			query: () => ({
				url: `genre/tv/list?language=en`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'GENRES' }
							),
					  ]
					: [{ type: 'Tv', id: 'GENRES' }],
		}),
		getTvRatedGuest: builder.query<RatedData, GuestRatedMovie>({
			query: ({ guest_session_id, page }) => ({
				url: `guest_session/${guest_session_id}/rated/tv?language=en-US&page=${page}&sort_by=created_at.asc`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map(
								(tv) => ({
									type: 'Tv' as const,
									id: tv.id,
								}),
								{ type: 'Tv', id: 'GUEST' }
							),
					  ]
					: [{ type: 'Tv', id: 'GUEST' }],
		}),
	}),
});

export const {
	usePopularTvQuery,
	useTopRatedTvQuery,
	useOnTheAirTvQuery,
	useAiringTodayTvQuery,
	useTvByIdQuery,
	useReviewsTvQuery,
	useRecomsTvQuery,
	useVideosTvQuery,
	useAlterTitleTvQuery,
	useCreditsTvQuery,
	useImagesTvQuery,
	useFavoriteTvMutation,
	useWatchListTvMutation,
	useRatingTvMutation,
	useRemoveRatingTvMutation,
	useGetFavoriteTvQuery,
	useGetWatchlistTvQuery,
	useGenresTvQuery,
	useGetTvRatedGuestQuery,
} = tvApiSlice;
