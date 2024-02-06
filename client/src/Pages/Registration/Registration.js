import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import app, { fs } from "../../Firebase/firebase.config";
const auth = getAuth(app);

const styles = {
  inputStyles: {
    border: "1px solid #FDFD96",
    padding: "6px",
    width: "100%",
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
  const [loading, setLoading] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();
    setError("");
    /*RegEx for input validation */
    const namePattern = /^[a-zA-z .]+$/;
    const phnPattern = /^(\+88)?-?01[3-9]\d{8}$/;
    const passPattern =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    /* Name validation:*/
    if (
      name.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      address.length === 0
    ) {
      setError("Empty field is not allowed !");
      return;
    }
    if (!name.match(namePattern)) {
      setError("Only Alphabets are Allowed ");
      return;
    }
    if (name.length < 3 || name.length > 30) {
      setError("Length of name must be within 3-30 ");
      return;
    }
    /* Phone Number validation:*/

    if (!phone.match(phnPattern)) {
      setError("Please Enter a valid bangladeshi mobile number!!");
      return;
    }

    /*Password Validation*/

    if (!password.match(passPattern)) {
      setError(
        "Password must contain at least one spacial char,one upper , lower case letter and at least one digit. (At least 8)"
      );
      return;
    }
    /* Email validation:*/

    if (!email.match(emailPattern)) {
      setError("Email is not valid!");
      return;
    }

    /*Password confirmation */

    if (password !== conPassword) {
      setError("Password doesn't match!");
      return;
    }

    setError("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        // const useremail = userCredential.user.email;

        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Email verification send !After verification you can login");

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
            setLoading(false);
            navigate("/login");
          })

          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          // The email is already registered.
          alert("User exists. Please try with a different email!");
          setLoading(false);
        }
      });
  };
  return (
    <div className=" d-flex flex-col justify-center align-items-center mt-5 mb-5 text-center rounded">
      <div
        className="p-4 bg-slate-900   w-5/12"
        style={{
          borderRadius: "10px",
          border: "2px solid #fffec1",
        }}
      >
        <h2 className="h2 mt-4 text-white">Registration Form</h2>
        <form className="p-5">
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
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="r_conpassword"
              onChange={(event) => setConPassword(event.target.value)}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <button
            type="button"
            className="btn  btn-sm btn-accent mt-5 w-50"
            onClick={(e) => handleRegistration(e)}
          >
            {loading ? (
              <span className=" flex justify-center items-center">
                Submitting{" "}
                <span className="loading loading-spinner loading-xs ml-2"></span>
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
