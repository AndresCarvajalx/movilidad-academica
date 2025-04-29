import { collection, getDocs } from 'firebase/firestore';
import { IRequestForm } from '../types';
import { db } from '../api/firebase';

async function fetchAllRequests() {
  const requestsSnapshot = await getDocs(collection(db, "solicitudes"));
  const requests: IRequestForm[] = [];
  requestsSnapshot.forEach(doc => {
    const data = doc.data() as IRequestForm;
    requests.push(data);
  });
  return requests;
}

export default fetchAllRequests;