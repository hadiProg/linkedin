import LoginComponents from "../components/LoginComponents";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useState } from "react";
export default function Login() {
  const [loading, setlonading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        setlonading(true);
        navigate("/home");
      } else {
        setlonading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <LoginComponents />;
}
