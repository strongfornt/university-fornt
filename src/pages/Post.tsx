/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useLazyGetInstantMessageQuery } from "../redux/features/intstantMessaging/baseApi";

export default function Post() {
  const [form] = Form.useForm();
  const [triggerQuery, { data, isLoading }] = useLazyGetInstantMessageQuery();

  
  
  const handleOnFinish = (value?: any) => {
    
    triggerQuery({
      params: {
        accountId: 52,
        startDate: "2024-11-11",
        endDate: "2025-11-11",
        pageNumber: 1,
        pageSize:value?.id || 10,
        // id: value?.id || undefined, // Use the submitted ID here
      },
      urlKey: "GetChatHistory",
    });
  };

  useEffect(() => {
    handleOnFinish()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form onFinish={handleOnFinish} form={form}>
      <div className="flex gap-2">
        <Form.Item
          name="id"
          className="mb-5"
          label={
            <span className="text-[#333] text-[16px] font-bold">
              ID <span style={{ color: "red" }}>*</span>
            </span>
          }
          rules={[{ required: true, message: "Please input the ID" }]}
        >
          <Input placeholder="Enter ID" />
        </Form.Item>
        <Form.Item className="mb-5">
          <Button
            htmlType="submit"
            className="w-full !text-white font-medium"
            style={{
              background:
                "var(--Col-2, linear-gradient(180deg, #947df0 33%, #947df8 100%))",
            }}
          >
            Fetch Data
          </Button>
        </Form.Item>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {data?.items?.map((item: any, idx: number) => (
          <div key={idx} className="bg-white/25 shadow-md border">
            {item?.employeeId} - 
            {item?.employeeName}
          </div>
        ))}
      </div>
    </Form>
  );
}
