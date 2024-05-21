import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB27VXrL4zfMwu7RqQR41cntwhWc4wsFnA",
	authDomain: "netflix-clone-ed8c2.firebaseapp.com",
	projectId: "netflix-clone-ed8c2",
	storageBucket: "netflix-clone-ed8c2.appspot.com",
	messagingSenderId: "613122128364",
	appId: "1:613122128364:web:e2098dcc3daf9ff1c168c9",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
