import { useState } from "react";
import { LoginAPI, RegisterApi } from "../api/AuthApi";
import LinkedinLogo from "../Images/240_F_395391650_6LfU41V5A4WIhdTis899OaF7wXVgThgP.jpg";
import "../sass/LoginCompoent.scss";
import GoogleButton from "react-google-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleSigninApi } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
export default function LoginComponents() {
  const [cre, setcre] = useState({});
  const [Show, SetShow] = useState(true);
  const navigate = useNavigate();
  const login = async () => {
    try {
      let res = await LoginAPI(cre.email, cre.password);
      localStorage.setItem("userEmail", res.user.email);
      console.log(localStorage.getItem("userEmail"));
      toast.success("Signed In to Linkedin!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check Your credentials");
    }
  };

  const SigninwithGoogle = async () => {
    try {
      let res = await GoogleSigninApi();
      console.log(res);
      toast.success("Signed In to Linkedin!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Error signing in with Google");
    }
  };

  const ShowFun = () => {
    if (Show) {
      SetShow(false);
    } else {
      SetShow(true);
    }
  };

  return (
    <div className="main">
      <div className="mainheader">
        <img className="LinkedinLogo" src={LinkedinLogo} alt="Linkedin IMG" />
        <button className="toJoinNow" onClick={() => navigate("/register")}>
          join Now
        </button>
      </div>
      <div className="maininformation">
        <h1 className="loginH1">Welcome to your professional community</h1>
        <label htmlFor="emailorphone" className="label">
          Email or phone
        </label>
        <input
          id="emailorphone"
          type="text"
          className="commmonInput"
          onChange={(e) => setcre({ ...cre, email: e.target.value })}
        />
        <div
          style={{
            margin: "30px 0px 0px",
            width: "100%",
            position: "relative",
          }}
        >
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
            id="pass"
            type={Show ? "password" : "text"}
            className="commmonInput secound"
            onChange={(e) => setcre({ ...cre, password: e.target.value })}
          />
          <button className="forShowPass" onClick={() => ShowFun()}>
            Show
          </button>
        </div>
        <button onClick={() => login()} className="loginBtn">
          Sign in
        </button>
        <hr className="mainHr" />
      </div>
      <div className="containerGoogleButton">
        <GoogleButton
          onClick={() => {
            SigninwithGoogle();
          }}
        />
      </div>
    </div>
  );
}
