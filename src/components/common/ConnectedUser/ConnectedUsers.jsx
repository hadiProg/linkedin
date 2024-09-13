import React from "react";
import "./ConnectedUsers.scss";
import { useState, useEffect } from "react";
import myimage from "../../../Images/FirstProfile.svg";
import backgroundimage from "../../../Images/‏‏HomeProfileCard - نسخة.svg";
import { getCurrentUser, getConnection } from "../../../api/FireStore";
export default function ConnectedUsers({ user, getcurrentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  const [myUser, setMyUser] = useState({});
  const [myimageLink, setMyImageLink] = useState(myimage);

  const print = () => {
    getcurrentUser(user.id, user.name);
  };

  useEffect(() => {
    getCurrentUser(setMyUser);
  }, []);
  useEffect(() => {
    getConnection(myUser.UserId, user.id, setIsConnected);
  }, [user.id, myUser.UserId]);
  console.log(myimage);
  console.log(user.imageLink);
  return isConnected ? null : (
    <>
      <div className="mainConteiner">
        <div className="backgroundImage"></div>
        <img
          src={user.imageLink ? user.imageLink : myimageLink}
          alt=""
          className="myImage1"
        />
        <div className="dataContainer">
          <p className="name">{user.name}</p>
          <p className="data">
            {user.comppany} | {user.city ? user.city : "..."} |{" "}
            {user.skill ? user.skill : "....."} |{" "}
            {user.about ? user.about : "......"}
          </p>
          <a className="data" href={user.website} target="blank">
            {user.website}
          </a>
          <button onClick={print} className="mybutton">
            follow
          </button>
        </div>
      </div>
    </>
  );
}
