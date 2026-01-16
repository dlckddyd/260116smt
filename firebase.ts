import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics, isSupported } from "firebase/analytics"; 

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
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Storage service

// [수정됨] 프리뷰 환경에서의 오류 방지를 위해 Analytics 잠시 비활성화
// API 키에 도메인 제한이 걸려있을 경우, 로컬/프리뷰에서 Analytics 초기화 시 400 에러가 발생하여 앱이 멈춥니다.
/*
isSupported().then((supported) => {
  if (supported) {
    try {
      getAnalytics(app);
    } catch (e) {
      console.warn("Analytics initialization failed:", e);
    }
  }
}).catch((error) => {
  console.warn("Firebase Analytics not supported:", error);
});
*/