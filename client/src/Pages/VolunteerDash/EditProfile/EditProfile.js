import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fs } from "../../../Firebase/firebase.config";

import { storage } from "../../../Firebase/firebase.config";
const styles = {
  inputStyles: {
    padding: "8px",
    borderRadius: "8px",
    border: "2px solid lightgray",
    backgroundColor: "#F5F7CE",
  },
};
export default function EditProfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [updatedPhoto, setUpdatePhoto] = useState(location.state.imageRef);
  const uid = useState(location.state.uid);
  const [updatedPhone, setUpdatedPhone] = useState(location.state.phone);
  const [updatedAddress, setUpdatedAddress] = useState(location.state.address);
  const [updatedName, setUpdatedName] = useState(location.state.name);
  const [availableArea, setUpdatedAvailableArea] = useState(
    location.state.availableArea
  );
  // useEffect(() => {
  //   getDownloadURL(ref(storage, `/images/ProfilePictures/${uid}`))
  //     .then((photoUrl) => {
  //       console.log(photoUrl);
  //       setUpdatePhoto(photoUrl);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setUpdatePhoto(null);
  //     });
  // }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    // //  *RegEx for input validation
    // const namePattern = /^[a-zA-z .]+$/;
    // const phnPattern = /^(\+88)?-?01[3-9]\d{8}$/;

    /**From input values */
    if (updatedName.length === 0 || updatedPhone.length === 0) {
      alert("Name and phone number must be provided !");
    }
    const docRef = doc(fs, "volunteers", auth.currentUser.uid);
    await updateDoc(docRef, {
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress,
      availableArea: availableArea,
      imageRef: updatedPhoto,
    })
      .then(() => {
        alert("Profile Updated successfully!!");
        navigate("/volunteer/profile");
      })
      .catch((err) => alert({ err }));
    await updateProfile(auth.currentUser, {
      displayName: updatedName,
      photoURL: updatedPhoto,
    });
  };

  function handleImgUpload(event) {
    const img = event.target.files[0];
    document.getElementById("img-preview").style.display = "block";
    const imgOb = URL.createObjectURL(img);
    document.getElementById("img-preview").src = imgOb;

    // console.log(img);

    const storageRef = ref(storage, `images/ProfilePictures/${uid}`);

    uploadBytes(storageRef, img)
      .then((result) => {
        setUpdatePhoto(storageRef);
      })
      .catch((err) => console.log("Can not upload"));
  }

  return (
    <div className="d-flex justify-center mt-5 ">
      <div
        className="card w-75 mt-6 p-4  border-t-4 border-t-accent"
        style={{
          boxShadow: "1px 1px  gray",
          backgroundColor: "white",
        }}
      >
        <div className="d-flex justify-between"></div>

        <div className="row">
          <p className="text-center h3">Edit Profile</p>
          <div className="col-md-4 d-flex flex-col justify-center ">
            <img
              src={updatedPhoto}
              className="card-img-top img-fluid mb-3 img-thumbnail"
              alt="Card  cap"
              id="img-preview"
              style={{ width: "300px", height: "250px" }}
            />

            <label
              className="btn"
              for="img-upload"
              id="img-label"
              style={{ backgroundColor: "#F5F7CE" }}
            >
              Update image
            </label>
            <input
              id="img-upload"
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              style={{ display: "none" }}
              onChange={handleImgUpload}
            />
          </div>
          <div className="col-md-8">
            <form className="card-body" onSubmit={handleSave}>
              <label className="font-bold">Name</label>
              <input
                type="text"
                name="name"
                style={styles.inputStyles}
                defaultValue={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <label className="font-bold">Phone Number</label>
              <input
                defaultValue={updatedPhone}
                name="phone"
                style={styles.inputStyles}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />

              <label className="font-bold">Address</label>
              <input
                defaultValue={updatedAddress}
                name="address"
                style={styles.inputStyles}
                onChange={(e) => setUpdatedAddress(e.target.value)}
              />
              <label className="font-bold">Available Area</label>
              <input
                style={styles.inputStyles}
                defaultValue={availableArea}
                name="availableAra"
                onChange={(e) => setUpdatedAvailableArea(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-accent
                 mt-3"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
