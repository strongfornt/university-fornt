/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import { ApiPathKeys } from "../../components/common/apiPath";
import {
  instantMessageApi,
  useCreateActionMutation,
  useGetDataQuery,
  useLazyGetDataQuery,
} from "./intstantMessaging/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { cacheAction, selectCache } from "./intstantMessaging/instantSlice";

export type TActionType = {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  payload?: any;
  urlKey: ApiPathKeys;
  params?: object;
  isToast?: boolean;
  toastType?: "small" | "big";
  successMessage?: string;
  errorMessage?: string;
};

export interface ILazyGetType {
  urlKey: ApiPathKeys;
  params: object;
}

type TParamsType = {
  isToast?: boolean;
  toastType?: "big" | "small";
  successMessage?: string;
  errorMessage?: string;
};

interface ILazyQueryOptions {
  pollingInterval?: number; // Interval in milliseconds
  refetchOnFocus?: boolean; // Refetch on window focus
  refetchOnReconnect?: boolean; // Refetch on network reconnect
  selectFromResult?: (state: any) => any;
  skipPollingIfUnfocused?: boolean; // Stop polling when unfocused
}

interface QueryOptions extends ILazyQueryOptions {
  refetchOnMountOrArgChange?: boolean;
  skip?: boolean;
}

export interface IGetType extends Omit<ILazyGetType, "params"> {
  urlKey: ApiPathKeys;
  params?: object;
  queryOptions?: QueryOptions;
}

export const useGetHook = ({ urlKey, params, queryOptions }: IGetType) => {
  const getDataResponse = useGetDataQuery(
    {
      params: params || {},
      urlKey,
    },
    queryOptions
  );
  return { getDataResponse };
};

export const useLazyGetHook = (lazyQueryOptions?: ILazyQueryOptions) => {
  const paramsRef = useSelector(selectCache);
  const dispatch = useDispatch();
  const paramsRenderCount = useRef(0);
  const [triggerQuery, response] = useLazyGetDataQuery(lazyQueryOptions);
  const queryCache = instantMessageApi.endpoints.getData.useQueryState(
    {
      params: paramsRef?.params as object,
      urlKey: paramsRef?.urlKey as ApiPathKeys,
    },
    {
      selectFromResult: (result) => result.data,
    }
  );

  const handleQueryTrigger = async ({ urlKey, params }: ILazyGetType) => {
    //trigger query for get data
    paramsRenderCount.current += 1
    dispatch(cacheAction({ params, urlKey }));
    if (!queryCache) {
      const res = await triggerQuery({
        params,
        urlKey,
      }).unwrap();

      return res;
    }

    if (paramsRenderCount.current > 2) {
      const res = await triggerQuery({
        params,
        urlKey,
      }).unwrap();
      return res;
    }
  };
  return {
    handleQueryTrigger,
    getDataResponse: response?.data || queryCache,
    response,
  };
};

export const usePostHook = () => {
  const [action, response] = useCreateActionMutation();
  const paramsRef = useRef<TParamsType | null>(null); // Use a ref to store the parameters
  const handleAction = async ({
    method,
    urlKey,
    params,
    payload,
    isToast,
    toastType,
    successMessage,
    errorMessage,
  }: TActionType) => {
    const Data = { params, urlKey, payload, method };
    paramsRef.current = { isToast, toastType, successMessage, errorMessage };
    const res = await action(Data);
    return res;
  };

  //  // Move side effects into a `useEffect`
  useEffect(() => {
    if (response?.isSuccess) {
      // console.log(response?.data?.successMessage);
      message.success(
        response?.data?.successMessage || response?.data?.message
      );
      // if (toastType !== "small" && isToast) {
      //   CustomMessage({
      //     type: "success",
      //     content:
      //       successMessage ||
      //       response?.data?.successMessage ||
      //       response?.data?.Message ||
      //       "Submitted Successfully",
      //   });
      // }
      // if (toastType === "small") {
      //   message.success(
      //     successMessage ||
      //       response?.data?.message ||
      //       response?.data?.successMessage ||
      //       "Submitted Successfully"
      //   );
      // }
    }

    if (response.isError) {
      // console.log(response?.error);
      message.error(response?.error?.data?.message);
      // if (toastType !== 'small' && isToast) {
      //   CustomMessage({
      //     type: 'error',
      //     content:
      //       errorMessage ||
      //       response?.error?.data?.message ||
      //       response?.data?.Message ||
      //       'Failed, try again',
      //   });
      // }
      // if (toastType === 'small') {
      //   message.error(
      //     errorMessage ||
      //       response?.data?.message ||
      //       response?.data?.Message ||
      //       'Failed, try again'
      //   );
      // }
    }
  }, [response]);

  return { handleAction, response };
};
