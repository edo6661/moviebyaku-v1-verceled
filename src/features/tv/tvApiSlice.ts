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
	}),
});

export const {
	usePopularTvQuery,
	useTopRatedTvQuery,
	useOnTheAirTvQuery,
	useAiringTodayTvQuery,
	useTvByIdQuery,
} = tvApiSlice;
