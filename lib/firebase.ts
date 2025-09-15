import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfCoDy2awL_mKcl8BPYDzwt1TpqpiFbIc",
  authDomain: "aviation-sales-report.firebaseapp.com",
  projectId: "aviation-sales-report",
  storageBucket: "aviation-sales-report.firebasestorage.app",
  messagingSenderId: "153567809177",
  appId: "1:153567809177:web:4a263b47aac9de36f8f208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
