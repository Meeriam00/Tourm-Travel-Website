import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const activityApi = createApi({
    reducerPath: 'activityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/activity' }), 
    tagTypes: ['Activity'],
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: () => '/activity',
            providesTags: ['Activity'],
        }),
        addActivity: builder.mutation({
            query: (activity) => ({
                url: '/activity',
                method: 'POST',
                body: activity,
            }),
            invalidatesTags: ['Activity'],
        }),
        editActivity: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/activity/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Activity'],
        }),
        deleteActivity: builder.mutation({
            query: (id) => ({
                url: `/activity/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Activity'],
        }),
    }),
});

export const {
    useGetActivitiesQuery,
    useAddActivityMutation,
    useEditActivityMutation,
    useDeleteActivityMutation
} = activityApi;
