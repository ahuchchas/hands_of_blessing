import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { fs } from "../../Firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const auth = getAuth(app);
const styles = {
  inputStyles: {
    border: "none",
    borderRadius: "0",
    borderBottom: "1px solid gray",
    padding: "5px",
    width: "100%",
  },
  buttonStyles: {
    backgroundColor: "#0D1338",
    color: "white",
    width: "100px",
    height: "45px",
    borderRadius: "0",
  },
};

export default function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [validate, setValidate] = useState(true);
  const handleRegistration = (event) => {
    event.preventDefault();

    /*RegEx for input validation */
    const namePattern = /^[a-zA-z .]+$/;
    const phnPattern = /^(\+88)?-?01[3-9]\d{8}$/;
    const passPattern =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    /* Name validation:*/
    if (name.length == 0) {
      setError("Empty field is not allowed !");

      setValidate(false);
    } else if (!name.match(namePattern)) {
      setError("Only Alphabets are Allowed ");
      setValidate(false);
    } else if (name.length < 3 || name.length > 30) {
      setError("Length of name must be within 3-30 ");

      setValidate(false);
    }
    /* Phone Number validation:*/

    if (phone.length == 0) {
      setError("Empty is not Allowed !!");
      setValidate(false);
    } else if (!phone.match(phnPattern)) {
      setError("Please Enter a valid bangladeshi mobile number!!");
      setValidate(false);
    }

    /*Password Validation*/

    if (password.length == 0) {
      setError("Empty field is not allowed !");

      setValidate(false);
    } else if (!password.match(passPattern)) {
      setError(
        "Password must contain at least one spacial char,one upper , lower case letter and at least one digit. (At least 8)"
      );
      setValidate(false);
    }
    /* Email validation:*/

    if (email.length == 0) {
      setError("Empty field is not allowed !");

      setValidate(false);
    } else if (!email.match(emailPattern)) {
      setError("Email is not valid!");

      setValidate(false);
    }

    /*Password confirmation */

    if (password != conPassword) {
      setError("Password doesn't match !");
      setValidate(false);
    } else if (validate) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          const useremail = userCredential.user.email;

          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert(
                "Email verification send !After verification you can login"
              );

              setDoc(
                doc(fs, "volunteers", userCredential.user.uid),

                {
                  uid: userCredential.user.uid,
                  name: name,
                  email: email,
                  address: address,
                  phone: phone,
                  password: password,
                  imageRef:
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                  availableArea: "",
                }
              );
              updateProfile(auth.currentUser, {
                displayName: name,
                photoURL:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
              })
                .then(() => {})
                .catch((err) => console.log(err));
              setDoc(
                doc(fs, "volunteersChat", userCredential.user.uid),

                {}
              );

              navigate("/login");
            })

            .catch((err) => {
              setError(err.message);
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            // The email is already registered.
            alert("User exists. Please try with a different email!");
          }
        });
    } else {
      return false;
    }
  };
  return (
    <div className="container d-flex flex-col justify-center align-items-center mt-5 mb-5 text-center rounded">
      <div
        className="row rounded"
        style={{
          width: "60%",
          boxShadow: "2px 2px 2px 2px #006565",

          backgroundColor: "#F2F2F2",
        }}
      >
        <div className="col-lg-6 col-md-5 col-sm-5  p-5 d-flex justify-center align-items-center">
          <img src="regBackground2.png" className="img-fluid" />
        </div>
        <div className="col-lg-6 col-md-5 col-sm-5 ">
          <h2
            className="h2 mt-4"
            style={{
              color: "#0D1338",
              fontWeight: "bold",
            }}
          >
            Registration Form
          </h2>
          <form className="p-5" onSubmit={handleRegistration}>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="text"
                class="form-control"
                placeholder="Enter Full Name"
                name="r_name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="email"
                className="form-control"
                placeholder="Enter  Email"
                name="r_email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="r_phone"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="text"
                className="form-control"
                placeholder="Enter Address"
                name="r_address"
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="r_password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                style={styles.inputStyles}
                type="text"
                className="form-control"
                placeholder="Confirm Password"
                name="r_conpassword"
                onChange={(event) => setConPassword(event.target.value)}
              />
            </div>
            <p style={{ color: "red" }}>{validate ? "" : error}</p>
            <button
              type="submit"
              className="btn rounded mt-5 "
              style={styles.buttonStyles}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
