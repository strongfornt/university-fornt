/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiPath, ApiPathKeys } from "../../../components/common/apiPath";

// export interface QueryParams {
//   accountId?: number;
//   startDate?: string | number; // Use string for date or number if it's a timestamp
//   endDate?: string | number;
//   pageNumber?: number;
//   pageSize?: number;
//   id?: string | number;
//   departmentName?:string
// }

export interface ApiParams {
  params: object;
  urlKey: ApiPathKeys; // Ensures urlKey is one of the keys in apiPath
}

export interface CrudeParams extends Omit<ApiParams, "params"> {
  params?: object;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: object;
}

export const createData = (
  params: CrudeParams["params"],
  urlKey: CrudeParams["urlKey"],
  method: CrudeParams["method"],
  payload?: CrudeParams["payload"]
): CrudeParams => {
  return {
    params,
    urlKey,
    payload,
    method,
  };
};

// Define a service using a base URL and expected endpoints
export const instantMessageApi = createApi({
  reducerPath: "instantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.trackforce.io",
  }),
  tagTypes: ["application"],
  endpoints: (builder) => ({
    getData: builder.query<any, ApiParams>({
      query: ({ params, urlKey }) => ({
        url: apiPath[urlKey],
        params,
      }),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER, // Prevent cache expiration
      providesTags: ["application"],
      // refetchOnMountOrArgChange: false,            // Disable refetch on mount
      // refetchOnArgChange: true,
    }),
    createAction: builder.mutation<any, CrudeParams>({
      query: ({ params, urlKey, method, payload }) => ({
        url: apiPath[urlKey],
        params,
        method,
        body: payload,
      }),
      invalidatesTags: ["application"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataQuery, useLazyGetDataQuery, useCreateActionMutation } =
  instantMessageApi;
