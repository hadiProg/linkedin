import React, { useEffect, useState } from "react";
import "../sass/ConnectionComponent.scss";
import { addConnection, getALLUser, getConnection } from "../api/FireStore";
import ConnectedUsers from "./common/ConnectedUser/ConnectedUsers";
export default function ConnectionComponent({ user }) {
  const [allUsers, setAllusers] = useState([]);
  useEffect(() => {
    getALLUser(setAllusers);
  }, []);
  const getCurrentUser = (id,name) => {
    addConnection(user.UserId, id,name);
  };
  return (
    <div>
      {allUsers.map((e) => {
        return e.id === user.UserId ? (
          <></>
        ) : (
          <ConnectedUsers user={e} getcurrentUser={getCurrentUser} />
        );
      })}
    </div>
  );
}
