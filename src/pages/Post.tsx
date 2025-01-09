/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect, useRef } from "react";
import { useLazyGetHook } from "../redux/features/useHooks";
import {
  instantMessageApi,
  useLazyGetDataQuery,
} from "../redux/features/intstantMessaging/baseApi";

export default function Post() {
  const [form] = Form.useForm();
  const paramsRef = useRef<any | null>(null);
  // const [createPost, { isLoading: postIsLoading }] = useCreateActionMutation();
  // const { data, isLoading } = useGetInstantMessageQuery({
  //   params: {
  //     accountId: 52,
  //     startDate: "2024-11-11",
  //     endDate: "2025-11-11",
  //     pageNumber: 1,
  //     pageSize: 10,
  //     // id: value?.id || undefined, // Use the submitted ID here
  //   },
  //   urlKey: "GetDepartments",
  // });

  // const {handleQueryTrigger, getDataResponse} = useLazyGetHook();
  // const handleGetPostData = async () => {
  //   const params = {
  //     accountId: 52,
  //     startDate: "2024-11-11",
  //     endDate: "2025-11-11",
  //     pageNumber: 1,
  //     pageSize: 10,
  //     // id: value?.id || undefined, // Use the submitted ID here
  //   };
  //   const res = await handleQueryTrigger({
  //     urlKey: "GetDepartments",
  //     params,
  //   });

  //   console.log( res);
  // };

  // useEffect(() => {
  //   handleGetPostData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const [triggerQuery, { isFetching, data, isLoading }] = useLazyGetDataQuery();
  const queryCache = instantMessageApi.endpoints.getData.useQueryState(
    {
      params: {
        accountId: 52,
        startDate: "2024-11-11",
        endDate: "2025-11-11",
        pageNumber: 1,
        pageSize: 10,
      },
      urlKey: "GetDepartments",
    },
    {
      selectFromResult: (result) => result.data, // Only retrieve the cached data
    }
  );

  // console.log(queryCache);
  console.log(paramsRef);
  
  

  const handleOnFinish = (value?: any) => {
    const params = {
      accountId: 52,
      startDate: "2024-11-11",
      endDate: "2025-11-11",
      pageNumber: 1,
      pageSize: value?.id || 10,
      // id: value?.id || undefined, // Use the submitted ID here
    };

      console.log(value);
      
    // paramsRef.current = {params, urlKey: "GetDepartments"}
    if (!queryCache) {
      triggerQuery({
        params,
        urlKey: "GetDepartments",
      });

    }

    if(value) {
      triggerQuery({
        params,
        urlKey: "GetDepartments",
      });
    }
  };

  // console.log(isFetching);

  useEffect(() => {
    handleOnFinish();
  }, []);

  // console.log(response);
  // const { handleAction,response } = usePostHook();

  // const handleOnFinish = async (data: any) => {
  //   const params = {
  //     accountId: 52,
  //     departmentName: data?.department,
  //     // id: value?.id || undefined, // Use the submitted ID here
  //   };

  //   // const Data = createData(params, "AddDepartment", "POST");
  //   // const Data = createData(params,"DeleteDepartment","DELETE")
  //   // console.log(createData);
  //   // console.log(Data);

  //   const res = await handleAction({
  //     method: "DELETE",
  //     params: params,
  //     urlKey: "DeleteDepartment",

  //   });
  //   console.log(res);

  //   // refetch();
  // };

  // console.log(response);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Form
      onFinish={handleOnFinish}
      form={form}
    >
      <div className="flex gap-2">
        <Form.Item
          name="department"
          className="mb-5"
          label={
            <span className="text-[#333] text-[16px] font-bold">
              ID <span style={{ color: "red" }}>*</span>
            </span>
          }
          rules={[{ required: true, message: "Please input the ID" }]}
        >
          <Input placeholder="Enter department" />
        </Form.Item>
        {/* <Form.Item
          name="body"
          className="mb-5"
          label={
            <span className="text-[#333] text-[16px] font-bold">
              ID <span style={{ color: "red" }}>*</span>
            </span>
          }
          rules={[{ required: true, message: "Please input the ID" }]}
        >
          <Input placeholder="Enter body" />
        </Form.Item>
        <Form.Item
          name="userId"
          className="mb-5"
          label={
            <span className="text-[#333] text-[16px] font-bold">
              ID <span style={{ color: "red" }}>*</span>
            </span>
          }
          rules={[{ required: true, message: "Please input the ID" }]}
        >
          <Input placeholder="Enter userId" />
        </Form.Item> */}
        <Form.Item className="mb-5">
          <Button
            // disabled={response?.isLoading}
            htmlType="submit"
            className="w-full !text-white font-medium"
            style={{
              background:
                "var(--Col-2, linear-gradient(180deg, #947df0 33%, #947df8 100%))",
            }}
          >
            hh
            {/* Fetch Data {response?.isLoading && <Spin />} */}
          </Button>
        </Form.Item>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {queryCache?.map((item: any) => (
          <div
            key={item?.intDepartmentId}
            className="bg-white/25 flex justify-between items-center shadow-md border"
          >
            <p>{item?.strDepartmentName} -</p>
            <button
              // onClick={() => handleOnFinish(item?.strDepartmentName)}
              className="bg-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Form>
  );
}
