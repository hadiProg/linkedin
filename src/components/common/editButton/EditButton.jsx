import React from "react";
import { useState } from "react";
export default function EditButton({ onEdit }) {
  return (
    <button
      className="buttonEdit"
      onClick={() => {
        onEdit();
      }}
    >
      Edit
    </button>
  );
}
