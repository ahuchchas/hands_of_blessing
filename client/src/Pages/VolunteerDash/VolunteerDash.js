import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app);
export default function VolunteerDash() {
  const [isUser, setUser] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email !== "admin123@gmail.com") {
          setUser(true);
        }
        setUserEmail(user.email);
      }
    });
  }, []);

  const menuitems = [
    {
      route: "profile",
      name: "Profile",
      icon: "",
      divider: false,
    },
    {
      route: "chats",
      name: "Chats",
      icon: "",
      divider: false,
    },
    {
      route: "allvolunteers",
      name: "All Volunteers",
      icon: "",
      divider: true,
    },
    {
      route: "projects",
      name: "Available Projects",
      icon: "",
      divider: false,
    },
  ];
  return (
    <div>
      {isUser && (
        <div className="flex bg-gray-100 w-full min-h-screen">
          <div className="w-3/12 bg-white rounded p-3 ">
            <div className="flex items-center space-x-4 p-2 mb-5">
              <div className="flex justify-center items-center">
                <FaUserCircle className="text-lg text-gray-700 me-4"></FaUserCircle>
                <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                  Volunteer Dashboard
                </h4>
                {/* <span className="text-sm tracking-wide flex items-center space-x-1">
          icon
          <span className="text-gray-600">Verified</span>
        </span> */}
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {menuitems.map((item) => {
                return (
                  <li>
                    <NavLink
                      to={item.route}
                      //   className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                          : "flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline"
                      }
                    >
                      <span className="text-gray-600">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                    {item.divider && (
                      <div
                        className=" mx-3 my-3"
                        style={{ border: "1px solid lightgray" }}
                      ></div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-9/12" style={{ backgroundColor: "#fffec8" }}>
            <Outlet></Outlet>
          </div>
        </div>
      )}

      {!isUser && (
        <div className="flex bg-gray-100 w-full min-h-screen   justify-center align-items-center">
          <h1 className="h1 text-red-700 ">
            You Do not have access to this page
          </h1>
        </div>
      )}
    </div>
  );
}
