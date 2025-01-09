import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Post from "../pages/Post";
import User from "../pages/User";
import Chat from "../pages/Chat";
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
                path:'/des',
                element:<User/>
            },
            {
                path:'/chat',
                element:<Chat/>
            }
        ]
    }
])

export default router;