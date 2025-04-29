import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const destinationApi = createApi({
    reducerPath: 'destinationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/destination' }), 
    tagTypes: ['Destination'],
    endpoints: (builder) => ({

        getDestinations: builder.query({
            query: () => '/destination',
            providesTags: ['Destination'],
        }),


        addDestination: builder.mutation({
            query: (destination) => ({
                url: '/destination',
                method: 'POST',
                body: destination,
            }),
            invalidatesTags: ['Destination'],
        }),


        editDestination: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/destination/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Destination'],
        }),


        deleteDestination: builder.mutation({
            query: (id) => ({
                url: `/destination/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Destination'],
        }),


    }),
});

export const {
    useGetDestinationsQuery,
    useAddDestinationMutation,
    useEditDestinationMutation,
    useDeleteDestinationMutation
} = destinationApi;
