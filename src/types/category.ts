// 카테고리 타입 정의
export const CATEGORIES = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'] as const;
export type Category = (typeof CATEGORIES)[number];
