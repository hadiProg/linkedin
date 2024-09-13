import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
export const LoginAPI = (email, pass) => {
  try {
    let res = signInWithEmailAndPassword(auth, email, pass);
    return res;
  } catch (err) {
    alert(err.errors.message);
  }
};
export const RegisterApi = (email, pass) => {
  try {
    let res = createUserWithEmailAndPassword(auth, email, pass);
    return res;
  } catch (err) {
    return err;
  }
};
// export const SigninWithgoogle = signInWithPopup(auth,provider)
export const GoogleSigninApi = () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let res = signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    return err;
  }
};
export const LogOut = () => {
  console.log(" hello from the correct place");
  try {
    signOut(auth);
    console.log(" baybay");
  } catch (err) {
    return err;
  }
};
