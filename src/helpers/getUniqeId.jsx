import React from "react";
import uuid from "react-uuid";
export default function getUniqeId() {
  let id = uuid();
  return id;
}
