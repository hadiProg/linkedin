import React from "react";
import "./topbar.scss";
import { IoMdSearch } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import LinkedinLogo from "../../Images/LinkedinLogoforHomePage.png";
import { IoNotifications } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUp from "../popup/PopUp";
export default function Topbar({ currUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeIcon, setactiveIcon] = useState("");
  let navigate = useNavigate();
  let goTo = (Rout) => {
    console.log(" hello from goto function");
    navigate(Rout);
  };
  // console.log(currUser.imageLink);
  return (
    <>
      <div className="Maintopbar">
        <img src={LinkedinLogo} alt="LinkedinLogo" className="LinkedinLogo" />
        <div className="iconesContainer">
          <IoMdSearch
            className={activeIcon === "search" ? "myIcon active" : "myIcon"}
            onClick={() => {
              setactiveIcon("search");
              navigate("/search");
            }}
          />
          <TiHome
            className={activeIcon === "home" ? "myIcon active" : "myIcon"}
            onClick={() => {
              navigate("/home");
              setactiveIcon("home");
            }}
          />
          <FaUserFriends
            className={activeIcon === "friend" ? "myIcon active" : "myIcon"}
            onClick={() => {
              setactiveIcon("friend");
              navigate("/connection");
            }}
          />
          <BsFillBriefcaseFill
            className={activeIcon === "bag" ? "myIcon active" : "myIcon"}
            onClick={() => {
              setactiveIcon("bag");
            }}
          />
          <RiMessage3Fill
            className={activeIcon === "message" ? "myIcon active" : "myIcon"}
            onClick={() => setactiveIcon("message")}
          />
          <IoNotifications
            className={activeIcon === "noti" ? "myIcon active" : "myIcon"}
            onClick={() => setactiveIcon("noti")}
          />
        </div>
        {!currUser?.imageLink ? (
          <FaUser
            className="userIcon"
            onClick={() => {
              setShowMenu(true);
            }}
          />
        ) : (
          <img
            src={currUser?.imageLink}
            className="userIImage"
            alt=""
            onClick={() => {
              setShowMenu(true);
            }}
          />
        )}
      </div>
      <PopUp disaple={showMenu} set={setShowMenu} />
    </>
  );
}
