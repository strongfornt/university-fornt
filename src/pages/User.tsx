/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetInstantMessageQuery } from "../redux/features/intstantMessaging/baseApi";

export default function User() {
       const { data, isLoading } = useGetInstantMessageQuery({
            params: {
              accountId: 52,
              startDate: 2024 - 11 - 11,
              endDate: 2025 - 11 - 11,
              pageNumber: 1,
              pageSize: 10,
            }
            ,
            urlKey:'GetUsers' 
          });
          if(isLoading) {
            return <p>Loading...</p>;
          }
  return (
    <div className="grid grid-cols-4 gap-10" >

        {
            data?.map((data: any, idx: number) =>  <div key={idx} className="bg-white/25 shadow-md border" >
                    {
                        data?.name
                    }
            </div> )
        }
       
    </div>
  )
}
