
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKTKrVtJQRK0LfBRNduB1il8uI67wGdZY",
  authDomain: "twitter-clone-c1417.firebaseapp.com",
  projectId: "twitter-clone-c1417",
  storageBucket: "twitter-clone-c1417.appspot.com",
  messagingSenderId: "101924508904",
  appId: "1:101924508904:web:d60b56dc393c7dd7da655d",
  measurementId: "G-DHGCK0R8NK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export default auth;