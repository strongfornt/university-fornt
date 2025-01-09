/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetHook } from "../redux/features/useHooks";

export default function User() {
  const params = {
    accountId: 52,
    startDate: 2024 - 11 - 11,
    endDate: 2025 - 11 - 11,
    pageNumber: 1,
    pageSize: 10,
  };
  const { getDataResponse } = useGetHook({
    params,
    urlKey: "GetDesignations",
  });
  if (getDataResponse?.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-10">
      {getDataResponse?.data?.map((data: any) => (
        <div
          key={data?.intDesignationId}
          className="bg-white/25 shadow-md border"
        >
          {data?.strDesignationName}
        </div>
      ))}
    </div>
  );
}
