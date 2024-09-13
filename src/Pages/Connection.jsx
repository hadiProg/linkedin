// import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
import { useState } from "react";
import ConnectionComponent from "../components/ConnectionComponent";
export default function Connection({ user }) {
  const [loading, setlonading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setlonading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <ConnectionComponent user={user} />;
}
