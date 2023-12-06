/* eslint-disable no-mixed-spaces-and-tabs */
import { apiSlice } from '../../api/apiSlice';

const peopleApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		PopularPeople: build.query<PersonSearchData, string>({
			query: (page) => ({
				url: `person/popular?page=${page}`,
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.results.map((person) => ({
								type: 'People' as const,
								id: person.id,
							})),
							{ type: 'People', id: 'PEOPLE' },
					  ]
					: [{ type: 'People', id: 'PEOPLE' }],
		}),
		personById: build.query<PersonDetails, string>({
			query: (id) => ({
				url: `person/${id}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [{ type: 'People', id }],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ImagesPeople: build.query<Profiles, string>({
			query: (id) => ({
				url: `person/${id}/images`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'People', id: `Images${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		CreditsPeople: build.query<PeopleCreditsData, string>({
			query: (id) => ({
				url: `person/${id}/combined_credits`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'People', id: `Credits${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
		ProfilePeople: build.query<Translations, string>({
			query: (id) => ({
				url: `person/${id}/translations`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (_result, _error, id) => [
				{ type: 'People', id: `Profile${id}` },
			],
			// ! 30 menit
			keepUnusedDataFor: 60 * 30,
		}),
	}),
});

export const {
	usePopularPeopleQuery,
	usePersonByIdQuery,
	useImagesPeopleQuery,
	useCreditsPeopleQuery,
} = peopleApiSlice;
