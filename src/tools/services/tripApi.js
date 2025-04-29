import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tripApi = createApi({
    reducerPath: 'tripApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/tour' }), 
    tagTypes: ['Tour'],

    endpoints: (builder) => ({

        getTour: builder.query({
            query: () => '/tour',
            providesTags: ['Tour'],
        }),


        addTour: builder.mutation({
            query: (tour) => ({
                url: '/tour',
                method: 'POST',
                body: tour,
            }),
            invalidatesTags: ['Tour'],
        }),


        editTour: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/tour/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Tour'],
        }),


        deleteTour: builder.mutation({
            query: (id) => ({
                url: `/tour/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tour'],
        }),
         
    }),
});
export const {
    useGetTourQuery,
    useAddTourMutation,
    useEditTourMutation, 
    useDeleteTourMutation
} = tripApi;



// http://localhost:5252