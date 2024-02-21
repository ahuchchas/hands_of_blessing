import AOS from "aos";
import "aos/dist/aos.css";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app, { fs } from "../../Firebase/firebase.config";
const auth = getAuth(app);

export default function AllVolunteers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.availableArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    AOS.init({ duration: 500 });

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
      // console.log(usersInfo[0]);
    });
  }, []);

  return (
    <div>
      <div className="hero  bg-slate-800 h-[300px] mb-7">
        <div className="hero-overlay  "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg" data-aos="fade-down">
            <h1 className="mb-4 text-4xl font-bold">
              Here is our dedicated <br />
              <span className="text-yellow-400  text-5xl">Volunteers</span>
            </h1>
            {/* search area */}
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by area"
                className="rounded px-2 py-1 mx-1 text-black"
              />
              {searchTerm !== "" && (
                <button onClick={() => setSearchTerm("")}>Clear</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredUsers.length < 1 && users.length > 0 && (
        <p className=" min-h-screen text-center">
          Sorry. No volunteer found in your searched area!
        </p>
      )}

      <div
        className={`grid grid-cols-1 ${
          auth.currentUser === null ? "md:grid-cols-4" : "md:grid-cols-3"
        } gap-4 p-3 mx-auto`}
      >
        {filteredUsers.map((user) => {
          return (
            <div
              className="card card-compact w-100 bg-base-100 shadow-xl mx-auto"
              data-aos="zoom-in"
              key={user.uid}
            >
              <figure className="px-10 pt-10">
                <img
                  src={
                    user.imageRef
                      ? user.imageRef
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  className="img-fluid w-100 h-40 rounded-xl"
                  alt="Album"
                />
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
                    {user.availableArea && `Available in ${user.availableArea}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
