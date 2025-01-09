import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBuc2VxvfoX1Jlx9_1v7dmzEBB71z22do",
  authDomain: "food--recipes-1ca46.firebaseapp.com",
  projectId: "food--recipes-1ca46",
  storageBucket: "food--recipes-1ca46.firebasestorage.app",
  messagingSenderId: "117495084991",
  appId: "1:117495084991:web:b47eece1bafb8e23f8530a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
