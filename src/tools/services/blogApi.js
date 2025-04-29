import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/blog' }), 
    tagTypes: ['Blog'],
    endpoints: (builder) => ({

        getBlogs: builder.query({
            query: () => '/blog',
            providesTags: ['Blog'],
        }),


        addBlogs: builder.mutation({
            query: (blog) => ({
                url: '/blog',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ['Blog'],
        }),


        editBlogs: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/blog/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Blog'],
        }),


        deleteBlogs: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),


    }),
});

export const {
    useGetBlogsQuery,
    useAddBlogsMutation,
    useEditBlogsMutation,
    useDeleteBlogsMutation
} = blogApi;
