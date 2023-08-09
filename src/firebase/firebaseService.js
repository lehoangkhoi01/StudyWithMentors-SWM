import { db } from "./firebase";
import {
  collection,
  Timestamp,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    const newData = {
      ...data,
      serverTimeStamp: Timestamp.now(),
    };
    await addDoc(collection(db, collectionName), newData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDocument = async (collectionName, id, updatedData) => {
  const documentRef = doc(db, collectionName, id);
  if (documentRef) {
    try {
      const result = await updateDoc(documentRef, updatedData);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject("Can not find document");
  }
};

export const deleteDocument = async (collectionName, id) => {
  const documentRef = doc(db, collectionName, id);
  if (documentRef) {
    try {
      await deleteDoc(documentRef);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject("Can not find document");
  }
};
