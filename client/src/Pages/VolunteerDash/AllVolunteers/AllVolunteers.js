import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { fs } from "../../../Firebase/firebase.config";
import { useEffect } from "react";
import { collection } from "firebase/firestore";
import { storage } from "../../../Firebase/firebase.config";
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ref } from "firebase/storage";
const auth = getAuth();

export default function AllVolunteers() {
  const [users, setUsers] = useState([]);
  const [userPhoto, setUserPhoto] = useState(null);
  useEffect(() => {
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
    <div className="container ">
      <div className="text-center">
        <h1 className=" text-5xl text-gray-700 my-6   font-bold">
          All Volunteers{" "}
        </h1>
        <h1 className="h6 text-orange-400">
          ---Here is our most talented volunteers---
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
        {users &&
          users.map((user) => {
            return (
              <div className="card w-80 bg-white shadow-xl rounded-none border-b-slate-100 border-b-8">
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
                <div className="card-body items-center text-center rounded-none">
                  <h2 className="card-title text-accent">{user.name}</h2>
                  <div>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>

                    <p>{user.address}</p>
                  </div>
                  <div className="card-actions"></div>
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
