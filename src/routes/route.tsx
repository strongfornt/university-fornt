import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Post from "../pages/Post";
import User from "../pages/User";
// import App from "@/";
const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index: true,
                element:<Post/>
            },
            {
                path:'/user',
                element:<User/>
            }
        ]
    }
])

export default router;