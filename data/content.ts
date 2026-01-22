import { Star } from 'lucide-react';

// =================================================================
// [관리자 가이드]
// 이 파일은 초기 데이터(Initial Data)로 사용됩니다.
// 실제 데이터는 DataContext를 통해 관리됩니다.
// =================================================================

// 1. 파트너사 목록
export const partners = [
  "청담다이닝", "더예쁜피부", "서울제빵소", "바디코드 필라테스", "세이프CCTV", 
  "강남면옥", "블랑드네일", "법무법인 정의", "어반짐", "클린마스터", 
  "미소치과", "부산갈비", "모던성형외과", "제주흑돈", "퓨어헤어", 
  "요가숨", "바른한의원", "에이스학원", "데일리플라워", "굿모닝약국",
  "더리얼부동산", "탑클래스수학", "스마일동물병원", "카페인충전", "네일더예쁨",
  "살롱드강남", "핏블리짐", "오토매니아", "디자인그룹 림", "한우명가",
  "리얼핏", "스터디카페 24", "골드부동산", "튼튼정형외과", "미스터피자",
  "뷰티인사이드", "더클래식", "제이디자인", "탑치과", "바른몸한의원"
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