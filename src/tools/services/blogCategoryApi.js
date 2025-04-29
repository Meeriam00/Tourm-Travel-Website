import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogCategoryApi = createApi({
  reducerPath: 'blogCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tourm-travel-backend-2.onrender.com/ad/blog' }), 
  tagTypes: ['BlogCategory'],
  endpoints: (builder) => ({
    getBlogCategories: builder.query({
      query: () => '/blogcategory',
      providesTags: ['BlogCategory'],
    }),
    addBlogCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/blogcategory',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['BlogCategory'],
    }),

    editBlogCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `/blogcategory/${id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: ['BlogCategory'],
    }),
    
    deleteBlogCategory: builder.mutation({
      query: (id) => ({
        url: `/blogcategory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BlogCategory'],
    }),
  }),
});

export const {
  useGetBlogCategoriesQuery,
  useAddBlogCategoryMutation,
  useEditBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoryApi;
