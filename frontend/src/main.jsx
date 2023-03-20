import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PaymentSuccess from "./UI/PaymentSuccess";

const Root = () => {
  return (
    <>
      <Outlet />
      <App />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
