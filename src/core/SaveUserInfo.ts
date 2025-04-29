import { db } from "../api/firebase";
import { doc, setDoc } from "firebase/firestore";

export const savePersonalInfo = async (
    uid: string,
    data: Record<string, string>
  ) => {
    try {
      await setDoc(doc(db, "usuarios", uid), data, { merge: true });
      return { success: true };
    } catch (error) {
      console.error("Error guardando datos personales:", error);
      return { success: false, error };
    }
  };