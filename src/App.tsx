import { Outlet } from "react-router-dom";
import Nav from "./pages/Nav";

export const baseURL = "https://app.trackforce.io";
function App() {
 

  return (
    <>
    <Nav/>
      <div className="mt-3" >
      <Outlet/>
      </div>
    </>
  );
}

export default App;
