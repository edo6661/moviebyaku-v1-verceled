import { apiSlice } from '../../api/apiSlice';

const reviewsApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		reviewById: build.query<DetailReview, string>({
			query: (id) => ({
				url: `review/${id}`,
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

export const { useReviewByIdQuery } = reviewsApiSlice;
