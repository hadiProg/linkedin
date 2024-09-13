import React from "react";
import Serach from "./common/searchUsers/Serach";
export default function SearchComponent({ user }) {
  return (
    <div>
      <Serach user={user} />
    </div>
  );
}
