import { apiPath } from "../../components/common/apiPath";
import { ApiParams } from "../features/intstantMessaging/baseApi";

interface IApiAction {
  params:ApiParams // optional params
}
export const apiAction = ({ params }: IApiAction) => {
  const url = apiPath[params?.urlKey];
  console.log(params?.urlKey);

  const { accountId, startDate, endDate, pageNumber, pageSize, id } =
    params?.params || {};

  return `${url}?id=${id}&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  // console.log(url);
};
