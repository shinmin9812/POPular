import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Store } from '../types/store';

export const storeAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/store',
  }),
  endpoints: (build) => ({
    getAllStore: build.query<Store[], void>({
      query: () => {
        return { url: `/all` };
      },
    }),
    getStoreById: build.query({
      query: ({ id }) => {
        return { url: `/${id}` };
      },
    }),
  }),
});

export const { useGetStoreByIdQuery, useGetAllStoreQuery } = storeAPI;
