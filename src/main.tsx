import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Note from "./pages/Note.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/note/:id",
        element: <Note />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
