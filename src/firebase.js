import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDxkm2Zggr7pSYOqqeuEsQRl4_vDCbEEZA",
authDomain: "eazyrefundpdfs.firebaseapp.com",
projectId: "eazyrefundpdfs",
storageBucket: "eazyrefundpdfs.firebasestorage.app",
messagingSenderId: "307521561345",
appId: "1:307521561345:web:0f1f4c5dfc7760d8183100",
measurementId: "G-LH9VBBN2GT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);