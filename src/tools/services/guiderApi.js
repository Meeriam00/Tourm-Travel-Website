import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const guiderApi = createApi({
    reducerPath: 'guiderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/guiderdetails' }), 
    tagTypes: ['Guider'],
    endpoints: (builder) => ({

        getGuiders: builder.query({
            query: () => '/guiderDetails',
            providesTags: ['Guider'],
        }),

        addGuiders: builder.mutation({
            query: (guider) => ({
                url: '/guiderDetails',
                method: 'POST',
                body: guider,
            }),
            invalidatesTags: ['Guider'],
        }),

        editGuiders: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/guiderDetails/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Guider'],
        }),

        

        deleteGuiders: builder.mutation({
            query: (id) => ({
                url: `/guiderDetails/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Guider'],
        }),
    }),
});




export const {
    useGetGuidersQuery,
    useAddGuidersMutation,
    useEditGuidersMutation,
    useDeleteGuidersMutation
} = guiderApi;

