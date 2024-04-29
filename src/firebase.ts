import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAn4LohLcrFpem_kVF3iCgRMXbz3u2AfAU",
    authDomain: "nwitter-reloaded-14ce0.firebaseapp.com",
    projectId: "nwitter-reloaded-14ce0",
    storageBucket: "nwitter-reloaded-14ce0.appspot.com",
    messagingSenderId: "342192028814",
    appId: "1:342192028814:web:82a17a83202093b6bf9ddf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);