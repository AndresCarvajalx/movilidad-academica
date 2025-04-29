import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { IRequestForm } from "../types";

const createRequest = async (request: IRequestForm) => {
  try {
    const docRef = await addDoc(collection(db, "solicitudes"), request);

    const generatedId = docRef.id;

    const updatedRequest = { ...request, id: generatedId };

    const requestDocRef = doc(db, "solicitudes", generatedId);

    await updateDoc(requestDocRef, updatedRequest);

    console.log("Solicitud creada correctamente con ID:", generatedId);
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
  }
};

export default createRequest;
