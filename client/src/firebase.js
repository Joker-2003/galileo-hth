import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Z7CuhVsesHuV36piGDPKQ1avgv3osJk",
  authDomain: "galileo-6f68b.firebaseapp.com",
  projectId: "galileo-6f68b",
  storageBucket: "galileo-6f68b.appspot.com",
  messagingSenderId: "193797293000",
  appId: "1:193797293000:web:f63d2e0d1699f28de336fd",
  measurementId: "G-8BPHW1LFLQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleLogout = () => {
  auth.signOut().then(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userid');
  });
};

const checkLoggedIn = () => {
  return (localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn')  === 'true');
};
export { auth, provider , googleLogout};