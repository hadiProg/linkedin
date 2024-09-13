// import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import SearchComponent from "../components/SearchComponent";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
import { useState } from "react";
export default function Serach({ user }) {
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
  return loading ? <Loader /> : <SearchComponent user={user} />;
}
