import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// =================================================================
// [설정 완료] 제공해주신 파이어베이스 키가 입력되었습니다.
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
const analytics = getAnalytics(app); // Analytics도 초기화
export const db = getFirestore(app);