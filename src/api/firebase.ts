import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBSgalwD1NQ-Xl4EsjZwRlrcldW4AzW2mA",
  authDomain: "movilidad-estudiantil-be217.firebaseapp.com",
  projectId: "movilidad-estudiantil-be217",
  storageBucket: "movilidad-estudiantil-be217.firebasestorage.app",
  messagingSenderId: "314322252988",
  appId: "1:314322252988:web:9fb6be64852a7f9ba3ccb9",
  measurementId: "G-CW6TM35D06"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);