import { firebaseAuth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(firebaseAuth, provider);
  // .then((result) => {
  //   console.log(result);
  //   return result;
  // })
  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  //   console.log(errorCode);
  //   console.log(errorMessage);
  //   console.log(email);
  //   console.log(credential);
  // });
};
