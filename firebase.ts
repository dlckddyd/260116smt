import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

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
// 앱이 이미 초기화되었는지 확인 후 초기화 (중복 방지)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 
export const auth = getAuth(app);