/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiAction } from "../../GetFuncRTk/action";
import { ApiPathKeys } from "../../../components/common/apiPath";

interface QueryParams {
  accountId?: number;
  startDate?: string | number; // Use string for date or number if it's a timestamp
  endDate?: string | number;
  pageNumber?: number;
  pageSize?: number;
  id?:string | number
}

export interface ApiParams {
  params: QueryParams;
  urlKey: ApiPathKeys; // Ensures urlKey is one of the keys in apiPath
}

// Define a service using a base URL and expected endpoints
export const instantMessageApi = createApi({
  reducerPath: "instantApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://app.trackforce.io' }),
  endpoints: (builder) => ({
    getInstantMessage: builder.query<any, ApiParams>({
      query: (params) => apiAction({params}),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,  // Prevent cache expiration
      // refetchOnMountOrArgChange: false,            // Disable refetch on mount
      // refetchOnArgChange: true, 
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useGetInstantMessageQuery, useLazyGetInstantMessageQuery } = instantMessageApi;
