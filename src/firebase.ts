import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB27VXrL4zfMwu7RqQR41cntwhWc4wsFnA",
	authDomain: "netflix-clone-ed8c2.firebaseapp.com",
	projectId: "netflix-clone-ed8c2",
	storageBucket: "netflix-clone-ed8c2",
	messagingSenderId: "613122128364",
	appId: "1:613122128364:web:e2098dcc3daf9ff1c168c9",
};

class Firebase {
	private static instance: Firebase;
	public app: FirebaseApp;
	public auth: Auth;
	public db: Firestore;

	private constructor() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);
		this.db = getFirestore(this.app);
	}

	public static getInstance(): Firebase {
		if (!Firebase.instance) {
			Firebase.instance = new Firebase();
		}
		return Firebase.instance;
	}
}

const firebaseInstance = Firebase.getInstance();
export const auth: Auth = firebaseInstance.auth;
export const db: Firestore = firebaseInstance.db;
