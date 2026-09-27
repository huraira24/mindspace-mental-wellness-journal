import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAk4l_4l1CNuSEJ7fuDO7fnNN8mx2Afky4",
  authDomain: "mindspace-5c10d.firebaseapp.com",
  projectId: "mindspace-5c10d",
  storageBucket: "mindspace-5c10d.firebasestorage.app",
  messagingSenderId: "867848617540",
  appId: "1:867848617540:web:11e7b7d4c08d99ea468611"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;