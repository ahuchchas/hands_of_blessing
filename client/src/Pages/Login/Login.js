import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app);

const styles = {
  inputStyles: {
    border: "none",

    padding: "10px",
  },
  buttonStyles: {
    backgroundColor: "#00cfc8",
    color: "rgb(13, 19, 56)",
    width: "100%",

    borderRadius: "0",
    padding: "10px",
  },
};
export default function Login() {
  const [logedIn, setLogIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.l_email.value;
    const password = event.target.l_pass.value;

    const emailPatternlog = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passPatternlog =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
    if (email.length == 0 || password.length == 0) {
      alert("Empty field is not alowed!!");
      return false;
    } else if (!email.match(emailPatternlog)) {
      alert("Email  is not valid !!");
      return false;
    } else if (!password.match(passPatternlog)) {
      alert("Password is not valid !!");
      return false;
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          if (userCredential.user.email === "admin123@gmail.com") {
            // alert("Welcome Admin !");
            navigate("/admin/volunteers");
          } else if (!userCredential.user.emailVerified) {
            alert("Please verify your email first,then try to login!");
          } else {
            // alert("Welcome Volunteer !");
            navigate("/volunteer/profile");
            setLogIn(true);
          }
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            alert("User email or password is incorrect !");
          }
        });
    }
  };
  return (
    <div className="container d-flex flex-col justify-center align-items-center mt-5 mb-5 text-center rounded">
      <div
        className="row  p-4"
        style={{
          width: "50%",

          borderRadius: "10px",
          backgroundColor: "#F2F2F2",
          boxShadow: "1px 1px 1px 1px gray",
        }}
      >
        <div className="col-md-6">
          <img src="regBackground2.png" />
        </div>
        <div className="col-md-6">
          <div>
            <h2
              className="h2 mt-5"
              style={{
                fontWeight: "bold",
              }}
            >
              Login Form
            </h2>

            <form className="p-3" onSubmit={handleLogin}>
              <div className="form-group p-2">
                <input
                  style={styles.inputStyles}
                  type="email"
                  className="form-control"
                  placeholder="Enter  Email"
                  name="l_email"
                />
              </div>
              <div className="form-group p-2">
                <input
                  style={styles.inputStyles}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="l_pass"
                />
              </div>
              <div className="form-group p-2">
                <button
                  type="submit"
                  className=" btn rounded mt-3 mb-3"
                  style={styles.buttonStyles}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
