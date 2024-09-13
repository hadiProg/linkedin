import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ProfileComponent from "../components/ProFileComponennt";

export default function Profile({ cuurentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
      console.log(!res?.accessToken);
    });
  }, []);

  return loading ? <Loader /> : <ProfileComponent cuurentUser={cuurentUser} />;
}
