import React from "react";
import PostStatus from "./common/PostUpdate/PostStatus";
import "../sass/HomeComponent.scss";
export default function HomeComponent({ user }) {
  return (
    <div className="mainHomeComponent">
      <PostStatus user={user} />
    </div>
  );
}
