import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";

import Registration from "../../Pages/Registration/Registration";
import VolunteerProfile from "../../Pages/VolunteerDash/VolunteerProfile/VolunteerProfile";

import VolunteerDash from "../../Pages/VolunteerDash/VolunteerDash";
import EditProfile from "../../Pages/VolunteerDash/EditProfile/EditProfile";
import AllVolunteers from "../../Pages/VolunteerDash/AllVolunteers/AllVolunteers";
import Help from "../../Pages/Help/Help";
import AdminDash from "../../Pages/AdminDash/AdminDash";
import Volunteers from "../../Pages/AdminDash/Volunteers/Volunteers";

import NewProject from "../../Pages/AdminDash/NewProject/NewProject";
import HelpRequests from "../../Pages/AdminDash/HelpRequests/HelpRequests";
import Projects from "../../Pages/VolunteerDash/Projects/Projects";
import AllProjects from "../../Pages/AdminDash/Projects/AllProjects";
import AboutUs from "../../components/AboutUs/AboutUs";
import EditProject from "../../Pages/AdminDash/EditProject/EditProject";
import DeleteProject from "../../Pages/AdminDash/DeleteProject/DeleteProject";
import Donate from "../../Pages/Donate/Donate";
import DonateSuccess from "../../Pages/Donate/DonateSuccess/DonateSuccess";
import Chats from "../../Pages/VolunteerDash/Chats/Chats";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/help",
        element: <Help></Help>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/donate",
        element: <Donate></Donate>,
      },
      {
        path: "/donate-success",
        element: <DonateSuccess></DonateSuccess>,
      },

      {
        path: "/volunteer",
        element: <VolunteerDash></VolunteerDash>,
        children: [
          {
            path: "profile",
            element: <VolunteerProfile></VolunteerProfile>,
          },
          {
            path: "editProfile",
            element: <EditProfile></EditProfile>,
          },
          {
            path: "allVolunteers",
            element: <AllVolunteers></AllVolunteers>,
          },
          {
            path: "projects",
            element: <Projects></Projects>,
          },
          {
            path: "chats",
            element: <Chats></Chats>,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminDash></AdminDash>,
        children: [
          {
            path: "volunteers",
            element: <Volunteers></Volunteers>,
          },
          {
            path: "projects",
            element: <AllProjects></AllProjects>,
          },
          {
            path: "newproject",
            element: <NewProject></NewProject>,
          },
          {
            path: "editproject",
            element: <EditProject></EditProject>,
          },
          {
            path: "deleteproject",
            element: <DeleteProject></DeleteProject>,
          },
          {
            path: "helps",
            element: <HelpRequests></HelpRequests>,
          },
        ],
      },
    ],
  },
]);
