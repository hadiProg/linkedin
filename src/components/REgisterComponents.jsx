import React from "react";
import "../sass/LoginCompoent.scss";
import { useState } from "react";
import { LoginAPI, RegisterApi } from "../api/AuthApi";
import LinkedinLogo from "../Images/240_F_395391650_6LfU41V5A4WIhdTis899OaF7wXVgThgP.jpg";
import "../sass/LoginCompoent.scss";
import GoogleButton from "react-google-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleSigninApi } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { poastUserData } from "../api/FireStore";
import getUniqeId from "../helpers/getUniqeId";
export default function REgisterComponents() {
  const [cre, setcre] = useState({});
  const [Show, SetShow] = useState(true);
  const navigate = useNavigate();
  const login = async () => {
    try {
      let res = await RegisterApi(cre.email, cre.password);
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Account Created!");
      poastUserData({ name: cre.name, email: cre.email, UserId: getUniqeId() });
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create Your Account");
    }
  };

  const SigninwithGoogle = async () => {
    try {
      let res = await GoogleSigninApi();
      console.log(res);
      toast.success("Account Created!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create Your Account");
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
      </div>

      <div className="maininformation">
        <h1 className="loginH1">Make the most of your professional life</h1>
        <label htmlFor="emailorphone" className="label">
          Your name
        </label>
        <input
          id="emailorphone"
          type="text"
          required
          className="commmonInput"
          onChange={(e) => setcre({ ...cre, name: e.target.value })}
        />
        <label htmlFor="emailorphone" className="label">
          Email or phone
        </label>
        <input
          id="emailorphone"
          type="email"
          required
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
            Password (6+ characters)
          </label>
          <input
            id="pass"
            required
            type={Show ? "password" : "text"}
            className="commmonInput secound"
            onChange={(e) => setcre({ ...cre, password: e.target.value })}
          />
          <button className="forShowPass" onClick={() => ShowFun()}>
            Show
          </button>
        </div>
        <p className="myParagraph">
          Already on LinkedIn?
          <button className="SigninButton" onClick={() => navigate("/")}>
            {" "}
            Sign in
          </button>
        </p>
        <button onClick={() => login()} className="loginBtn">
          Agree and Join
        </button>
        <hr className="mainHr" />
      </div>
      <div className="containerGoogleButton">
        <GoogleButton
          onClick={() => {
            SigninwithGoogle();
          }}
        >
          Register With Google
        </GoogleButton>
      </div>
    </div>
  );
}
