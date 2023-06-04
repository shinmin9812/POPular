import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Store } from '../types/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (build) => ({
    getAllStore: build.query<Store[], void>({
      query: () => {
        return { url: `/store/all` };
      },
    }),
    getStoreById: build.query({
      query: ({ id }) => {
        return { url: `/store/${id}` };
      },
    }),
    getAllPost: build.query({
      query: ({ postId }) => {
        return { url: `/post/all` };
      },
    }),
    getPostById: build.query({
      query: ({ postId }) => {
        return { url: `/post/id/${postId}` };
      },
    }),
    getReviewPostByStore: build.query({
      query: ({ storeId }) => {
        console.log(storeId);
        return { url: `/post/store/${storeId}` };
      },
    }),
  }),
});

export const { useGetStoreByIdQuery, useGetAllStoreQuery, useGetAllPostQuery, useGetReviewPostByStoreQuery } = api;
