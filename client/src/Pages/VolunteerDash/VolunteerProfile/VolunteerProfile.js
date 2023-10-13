import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { fs } from "../../../Firebase/firebase.config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { ref } from "firebase/storage";

import { storage } from "../../../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";
const auth = getAuth();

export default function VolunteerProfile() {
  // const [volunteers, setVolunteers] = useState([]);
  const [user, setUser] = useState({});
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((volunteer) => {
      if (volunteer) {
        async function getUserDoc() {
          const docRef = doc(fs, "volunteers", volunteer.uid);
          await getDoc(docRef)
            .then((doc) => {
              setUser(doc.data());

              getDownloadURL(
                ref(storage, `images/ProfilePictures/${doc.data().uid}`)
              )
                .then((photoUrl) => {
                  console.log(photoUrl);
                  setUserPhoto(photoUrl);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }

        getUserDoc();
      } else {
        navigate("/login");
        // alert("Please Register or  Login first ! ");
      }
    });
  }, []);

  return (
    <div className="d-flex justify-center mt-5 ">
      <div
        className="card w-75 mt-6 "
        style={{
          boxShadow: "1px 1px  gray",
          minHeight: "15rem",
          borderRadius: 0,
          borderBottom: "5px solid gray",
        }}
      >
        {Object.keys(user).length === 0 ? (
          <div class="d-flex justify-content-center mt-auto mb-auto">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div
              className=" d-flex justify-between  p-4"
              style={{ backgroundColor: "rgb(13, 19, 56)" }}
            >
              <div>
                <h3 className="h3 text-white">My Profile</h3>
              </div>
              <div>
                <button
                  className="rounded p-2"
                  style={{ backgroundColor: "white", color: "rgb(13, 19, 56)" }}
                  onClick={() => {
                    navigate("/volunteer/editProfile", { state: user });
                  }}
                >
                  <i className="bi bi-pencil"></i> <span>Edit</span>
                </button>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-md-4 d-flex flex-col justify-center ">
                {userPhoto ? (
                  <img
                    className="card-img-top img-fluid mb-3 img-thumbnail"
                    src={userPhoto}
                    alt="Card img cap"
                    id="img-preview"
                    style={{
                      width: "300px",
                      height: "250px",
                    }}
                  />
                ) : (
                  <img
                    className="card-img-top img-fluid mb-3 img-thumbnail"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt="Card img cap"
                    id="img-preview"
                    style={{
                      width: "300px",
                      height: "250px",
                    }}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Name: {user.name}</h5>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Phone Number: {user.phone}</p>
                  <p className="card-text">Address: {user.address}</p>
                  {!user.availableArea ? (
                    <p className="font-bold" style={{ color: "gray" }}>
                      Not Available Now
                    </p>
                  ) : (
                    <p className="card-text font-bold text-green-700">
                      Available in {user.availableArea}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
