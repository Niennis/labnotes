import { getAuth } from 'firebase/auth';
// import { collection, addDoc, onSnapshot, query, doc, deleteDoc, setDoc } from 'firebase/firestore';


const auth = getAuth();
export const currentUser = auth.currentUser;