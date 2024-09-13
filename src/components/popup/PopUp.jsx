import React, { useMemo } from "react";
import "./popup.scss";
import { LogOut } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import { getCurrentUser } from "../../api/FireStore";
import { useState } from "react";
export default function PopUp({ disaple, set }) {
  const [cureentUser, setCurrentUser] = useState({});
  let navigate = useNavigate();
  const toHomePage = () => {
    navigate("/profile");
  };
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  const onclickFunction = () => {
    navigate("/profile", {
      state: { id: cureentUser?.UserId },
    });
  };
  if (disaple) {
    return (
      <div className="mainMenu" onClick={() => set(false)}>
        <ul className="myMenu">
          <p className="name">{cureentUser?.name}</p>
          <p className="data">{cureentUser?.headLine}</p>
          <p className="data">{cureentUser?.comppany}</p>
          <p className="data">{cureentUser?.email}</p>
          <Button
            title={"Logout"}
            onClick={LogOut}
          />
          <Button title={"View ProfilePage"} onClick={onclickFunction} />
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
