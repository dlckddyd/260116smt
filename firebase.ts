import { initializeApp } from "firebase/app";

// =================================================================
// [설정 완료] 스마트플레이스 파이어베이스 키 설정
// =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBwhbyQ3wnrbLgl5wwlHNiV7008C-LVhQg",
  authDomain: "smartplace26.firebaseapp.com",
  projectId: "smartplace26",
  storageBucket: "smartplace26.firebasestorage.app",
  messagingSenderId: "931556191092",
  appId: "1:931556191092:web:c2f24a198f3788a3785a21",
  measurementId: "G-4EHDRYB3TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Storage are handled server-side now.
// Only export app if needed for other client-side SDKs later.
export default app;