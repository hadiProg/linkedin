import React from "react";
import REgisterComponents from "../components/REgisterComponents";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res.accessToken) {
        navigate("/home");
      } else {
        return <Loader />;
      }
    });
  }, []);
  return (
    <div>
      <REgisterComponents />
    </div>
  );
}
