import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://tourm-travel-backend-2.onrender.com/ad/faq" }),

  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => "/faq",
      providesTags: ["Faq"],
    }),
    
    addFaq: builder.mutation({
      query: (newFaq) => ({
        url: "/faq",
        method: "POST",
        body: newFaq,
      }),
      invalidatesTags: ["Faq"],
    }),


    editFaq: builder.mutation({
      query: ({ id, ...updatedFaq }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: updatedFaq,
      }),
      invalidatesTags: ["Faq"],
    }),

    
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const { useGetFaqsQuery, useAddFaqMutation, useEditFaqMutation, useDeleteFaqMutation } = faqApi;
