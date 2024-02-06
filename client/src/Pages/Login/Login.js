import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../Firebase/firebase.config";
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const emailPatternlog = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passPatternlog =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

    if (email.length === 0 || password.length === 0) {
      alert("Empty field is not alowed!!");
      return;
    } else if (!email.match(emailPatternlog)) {
      alert("Email  is not valid !!");
      return;
    } else if (!password.match(passPatternlog)) {
      alert("Password is not valid !!");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        if (userCredential.user.email === "admin123@gmail.com") {
          // alert("Welcome Admin !");
          navigate("/admin/volunteers");
        } else if (!userCredential.user.emailVerified) {
          alert("Please verify your email first,then try to login!");
        } else {
          // alert("Welcome Volunteer !");
          navigate("/volunteer/profile");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          alert("User email or password is incorrect !");
        }
        setLoading(false);
      });
  };
  return (
    <div className=" d-flex flex-col justify-center align-items-center mt-5 mb-5 text-center rounded">
      <div className="p-4 bg-slate-900 rounded-lg w-5/12">
        <div>
          <h2 className="h2 mt-5 text-white font-bold">Login Form</h2>

          <form className="p-3">
            <div className="form-group p-2">
              <input
                type="email"
                className="form-control border-none p-2"
                placeholder="Enter  Email"
                name="l_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="password"
                className="form-control border-none p-2"
                id="exampleInputPassword1"
                placeholder="Password"
                name="l_pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <button
                type="button"
                className=" btn rounded mt-3 mb-3 bg-accent w-full"
                onClick={(e) => handleLogin(e)}
              >
                {loading ? (
                  <span className=" flex justify-center items-center">
                    Logging in{" "}
                    <span className="loading loading-spinner loading-xs ml-2"></span>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
