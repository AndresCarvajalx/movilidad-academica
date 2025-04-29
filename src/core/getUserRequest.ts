import { collection, getDocs, query, where } from "firebase/firestore";
import { IRequestForm } from "../types";
import { db } from "../api/firebase";

export const getUserRequests = async (userId: string): Promise<IRequestForm[]> => {
  const q = query(
    collection(db, "solicitudes"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  const requests: IRequestForm[] = [];
  querySnapshot.forEach((doc) => {
    requests.push({
      ...(doc.data() as IRequestForm),
    });
  });
  return requests;
};
