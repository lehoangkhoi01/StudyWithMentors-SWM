import { firebaseAuth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(firebaseAuth, provider)
    .then((result) => {
      const data = {
        idToken: result.user.accessToken,
        localId: result.user.uid,
        email: result.user.email,
        fullName: result.user.displayName,
        avatarUrl: result.user.photoURL,
      };
      return data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
