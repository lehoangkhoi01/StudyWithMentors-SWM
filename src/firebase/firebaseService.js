import { db } from "./firebase";
import { collection, Timestamp, addDoc } from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    const newData = {
      ...data,
      serverTimeStamp: Timestamp.now(),
    };
    await addDoc(collection(db, collectionName), newData);
  } catch (error) {
    console.log(error);
  }
};
