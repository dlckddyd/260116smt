import { Star } from 'lucide-react';

// =================================================================
// [관리자 가이드]
// 이 파일은 초기 데이터(Initial Data)로 사용됩니다.
// 실제 데이터는 DataContext를 통해 관리됩니다.
// =================================================================

// 1. 파트너사 목록
export const partners = [
  "미래로 입시학원", "레푸스 서산점", "행복한 우리집 인테리어", "굿모닝 내과",
  "알라딘키즈풀빌라", "바른몸 정형외과", "스마일 동물병원", "달팽이독일보청기 동래센터",
  "더조은 치과", "데일리 카페", "달팽이독일보청기 서부산점", "어반 휘트니스",
  "뷰티 플러스", "탑 클래스 수학", "스위스보청기 공주점", "베스트 잉글리쉬",
  "드림 팩토리", "오티콘 전북남원점", "네이처 가든", "모던 하우스",
  "타이어프로 판암점", "심플 라이프", "그린 에너지", "와이덱스보청기",
  "스마트 솔루션", "블루 오션", "인천장여사도배장판", "골드 에셋",
  "프라임 에듀", "벨톤보청기 노원점", "스타트업 허브", "크리에이티브 랩",
  "바른철거", "디지털 마인드", "퓨처 테크", "금강보청기 익산점",
  "글로벌 트레이딩", "코리아 물류", "서울 유통", "경기 식품"
];

// 2. 고객 후기 타입 정의
export interface ReviewItem {
  id: string; 
  type: 'text' | 'image';
  name: string;
  company: string;
  content?: string;
  imageUrl?: string;
  rating: number;
  date: string;
}

// 초기 데이터 (DB 연동 전 테스트용)
export const reviewsData: ReviewItem[] = [];

// 3. 자주 묻는 질문 (FAQ) - 블록형 구조로 변경
export interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content: string; // text일 경우 문자열, image일 경우 URL
}

export interface FAQItem {
  id: string;
  categories: string[]; // 다중 카테고리 지원을 위해 문자열 배열로 변경
  question: string;
  blocks: ContentBlock[]; 
}

// 초기 데이터 (DB 연동 전 테스트용)
export const faqData: FAQItem[] = [];

// 기본 카테고리 목록 (DB가 비어있을 때 사용)
export const defaultFaqCategories = [
  "자주 찾는 도움말", "문제해결", "업체 등록", "업체 수정", 
  "업체 삭제/일시정지", "예약/주문", "리뷰 관리", "지도앱 예약", 
  "프로그램 노출", "솔루션/마케팅", "주인/운영자변경", "업체검색노출",
  "통계/분석", "브랜드관리", "스마트플레이스 앱"
];
