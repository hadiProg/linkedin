import React from "react";
import Topbar from "../components/topbar/Topbar";
import { getCurrentUser } from "../api/FireStore";
import { useMemo } from "react";
import { useState } from "react";
import Connection from "../Pages/Connection";
export default function ConnectionLayout() {
  const [currUser, setCurrUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrUser);
  }, []);
  return (
    <div className="mainDiv">
      <Topbar currUser={currUser} />
      <Connection user={currUser} />
    </div>
  );
}
