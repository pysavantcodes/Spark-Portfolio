import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import Root from "./components/Root.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        path: "",
        element: <App />,
      },
      {
        path: "/casestudies",
        element: <CaseStudies />,
      },
      {
        path: "/casestudies/:id",
        element: <CaseStudy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
