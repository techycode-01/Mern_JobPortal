import React from "react";

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import CreateJob from "../pages/CreateJob";
import UpdateJob from "../pages/UpdateJob";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        path: "/my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/salary",
        element: <SalaryPage />,
      },
      {
        path: "/post-job",
        element: <CreateJob />,
      },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) =>
          fetch(`https://mern-jobportal-ckfs.onrender.com/all-jobs/${params.id}`),
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
]);

export default router;
