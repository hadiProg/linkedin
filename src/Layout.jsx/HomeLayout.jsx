import React from "react";
import Home from "../Pages/Home";
import Topbar from "../components/topbar/Topbar";
import { getCurrentUser } from "../api/FireStore";
import { useMemo } from "react";
import { useState } from "react";
export default function HomeLayout() {
  const [currUser, setCurrUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrUser);
  }, []);
  return (
    <div className="mainDiv">
      <Topbar  currUser={currUser} />
      <Home user={currUser}/>
    </div>
  );
}
