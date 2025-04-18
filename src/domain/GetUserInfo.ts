import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { IUserData } from "../types";

export const getUserData = async (userId: string) => {
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as IUserData;
  } else {
    throw new Error("No existe el usuario");
  }
};