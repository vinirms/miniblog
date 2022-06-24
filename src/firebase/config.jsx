import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTTgkwO-Qy2IyP0FOv4BMA1dJgyGSKD4w",

  authDomain: "miniblog-b809b.firebaseapp.com",

  projectId: "miniblog-b809b",

  storageBucket: "miniblog-b809b.appspot.com",

  messagingSenderId: "691066482554",

  appId: "1:691066482554:web:24b7b9d505d202784d70c3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
