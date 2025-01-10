import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/route.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      {/* <App /> */}
    {/* <Provider store={stor}>
    </Provider> */}
      <RouterProvider router={router} />
  </StrictMode>
);
