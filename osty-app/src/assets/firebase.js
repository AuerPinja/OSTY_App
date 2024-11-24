
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

/*yritin laittaa nämä tiedot dotenvin kautta, mutta se rikkoi koko sovelluksen eikä ollut aikaa korjata*/

const firebaseConfig = {
  apiKey: "AIzaSyDMhIzWn106jO4U4sTJh1UU0-wHY7IFQlI",
  authDomain: "osty-b9b14.firebaseapp.com",
  projectId: "osty-b9b14",
  storageBucket: "osty-b9b14.firebasestorage.app",
  messagingSenderId: "721794808662",
  appId: "1:721794808662:web:8e188b66d62083da7a34f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};