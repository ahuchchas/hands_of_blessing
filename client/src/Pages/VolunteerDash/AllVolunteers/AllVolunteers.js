import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { fs } from "../../../Firebase/firebase.config";
import { useEffect } from "react";
import { collection } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
const auth = getAuth();

export default function AllVolunteers() {
  const [users, setUsers] = useState([]);
  const [userPhoto, setUserPhoto] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 3000 });
    auth.onAuthStateChanged((volunteer) => {
      if (volunteer) {
        getDocs(collection(fs, "volunteers")).then((querySnapshot) => {
          const usersInfo = [];
          querySnapshot.forEach((doc) => {
            const userInfo = {
              uid: doc.data().uid,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone,
              address: doc.data().address,
              imageRef: doc.data().imageRef,
              availableArea: doc.data().availableArea,
            };

            usersInfo.push(userInfo);
            setUsers(usersInfo);
          });
          console.log(usersInfo[0]);
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="hero  bg-slate-800 h-[300px] mb-7">
        <div className="hero-overlay  "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg" data-aos="fade-down">
            <h1 className="mb-4 text-4xl font-bold">
              Here is our most talented <br />
              <span className="text-yellow-400  text-5xl">Volunteers</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
        {users &&
          users.map((user) => {
            return (
              <div
                className="card card-compact   w-80 bg-base-100 shadow-xl"
                data-aos="zoom-in"
              >
                <figure className="px-10 pt-10">
                  {user.imageRef ? (
                    <img
                      src={user.imageRef}
                      className="img-fluid w-100 h-40 rounded-xl"
                      alt="Album"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      className="img-fluid w-100 h-40 rounded-xl"
                      alt="Album"
                    />
                  )}
                </figure>
                <div className="card-body mx-1">
                  <h2 className="card-title">Name: {user.name}</h2>
                  <div>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p> Address: {user.address}</p>{" "}
                  </div>
                  <div className="card-actions justify-end">
                    <div className="badge   badge-accent text-white  w-full rounded-none">
                      {user.availableArea &&
                        `Available in ${user.availableArea}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/**      <div className="row gap-4 justify-center">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
          
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Available Area</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {user.imageRef ? (
                            <img
                              src={user.imageRef}
                              className="img-fluid rounded w-100 h-40"
                              alt="Album"
                            />
                          ) : (
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                              className="img-fluid rounded w-100 h-40"
                              alt="Album"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{user.phone}</p>
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                  <td>
                    <p>{user.address}</p>
                  </td>
                  <td>
                    <p className="text-green-800 font-bold">
                      {user.availableArea}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
