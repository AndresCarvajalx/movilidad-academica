import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../api/firebase';

async function updateRequestState(requestId: string, newState: "pendiente" | "aceptada" | "rechazada", observation: string) {
  const requestDocRef = doc(db, 'solicitudes', requestId);
  await updateDoc(requestDocRef, {
    estado: newState,
    observacionesAdmin: observation,
    vistoPorEstudiante: false
  });
}

export default updateRequestState;