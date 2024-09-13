import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { getCurrentUser } from "../api/FireStore";
import Topbar from "../components/topbar/Topbar";
import Profile from "../Pages/Profile";
export default function ProfilePagelayout() {
  const [currentUser, setCurrentUser] = useState();
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  //All thing here ok
  return (
    <div>
      <Topbar currUser={currentUser} />
      <Profile cuurentUser={currentUser} />
    </div>
  );
}
