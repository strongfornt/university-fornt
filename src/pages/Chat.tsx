/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useLazyGetHook } from "../redux/features/useHooks";

export default function Chat() {
  const [form] = Form.useForm();


  const { handleQueryTrigger, getDataResponse, response } = useLazyGetHook();

  const handleOnFinish = async (value?: any) => {
    const params = {
      accountId: 52,
      startDate: "2024-11-11",
      endDate: "2025-11-11",
      pageNumber: 1,
      pageSize: value?.department || 10,
      // id: value?.id || undefined, // Use the submitted ID here
    };

     await handleQueryTrigger({ params, urlKey: "GetChatHistory" });
  }

  useEffect(() => {
    handleOnFinish();
  }, []);

  
  

  if (response?.isFetching) {
    return <p>Loading...</p>;
  }


  return (
    <Form onFinish={handleOnFinish} form={form}>
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
        {getDataResponse?.items?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="bg-white/25 flex justify-between items-center shadow-md border"
          >
            <p>{item?.deviceName} -</p>
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
