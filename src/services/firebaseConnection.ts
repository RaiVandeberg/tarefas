import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0TIc-AuOZ1KwAW3RLxZtccoNv_5X4J04",
  authDomain: "tarefas-ac7bf.firebaseapp.com",
  projectId: "tarefas-ac7bf",
  storageBucket: "tarefas-ac7bf.firebasestorage.app",
  messagingSenderId: "45353598066",
  appId: "1:45353598066:web:1bb3bec02245d244fc56eb"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };