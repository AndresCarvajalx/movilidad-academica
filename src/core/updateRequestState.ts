import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../api/firebase';

async function updateRequestState(requestId: string, newState: "pendiente" | "aceptada" | "rechazada", observation: string) {
  const requestDocRef = doc(db, 'solicitudes', requestId);
  await updateDoc(requestDocRef, {
    estado: newState,
    observacionesAdmin: observation,
  });
}

export default updateRequestState;