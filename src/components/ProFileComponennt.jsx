import React, { useState } from "react";
import { getCurrentUser } from "../api/FireStore";
import ProfileCard from "./common/profileCard/ProfileCard";
import ProfileEdit from "./common/profileedit/ProfileEdit";

export default function ProfileComponent({ cuurentUser }) {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {!isEdit ? (
        <ProfileCard currentUser={cuurentUser} onEdit={onEdit} />
      ) : (
        <ProfileEdit onEdit={onEdit} currentUser={cuurentUser} />
      )}
    </div>
  );
}
