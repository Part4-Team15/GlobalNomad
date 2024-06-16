const queryKeys = {
  // 체험 상세
  activity: (id: string) => ['activity', id] as const,
  user: () => ['user'] as const,
  availableSchedules: (id: string) => ['availableSchedules', id] as const,
  reservedSchedules: () => ['reservation'] as const,
  reviews: (id: number, pageNum: number, size: number) => ['reviews', id, pageNum, size] as const,

  // 메인 페이지
  currentPageActivity: (pageNum: number, size: number, category: string, sort: string) =>
    ['currentPageActivity', pageNum, size, category, sort] as const,
  popularActivity: () => ['popularActivity'] as const,
  searchPageActivity: (keyword: string, pageNum: number, size: number) =>
    ['searchPageActivity', keyword, pageNum, size] as const,

  // 체험 등록
  assignData: () => ['assignData'] as const,
  assignDate: () => ['assign/Date'] as const,
  assignStartTime: () => ['assign/StartTime'] as const,
  assignEndTime: () => ['assign/EndTime'] as const,

  // 체험 수정
  modifyData: () => ['modifyData'] as const,
  modifySchedule: () => ['modifyData/Schedule'] as const,
  modifyScheduleDate: () => ['modifyData/Schedule/Date'] as const,
  modifyScheduleStartTime: () => ['modifyData/Schedule/StartTime'] as const,
  modifyScheduleEndTime: () => ['modifyData/Schedule/EndTime'] as const,

  // 예약 내역
  reservations: () => ['reservations'] as const,
  reservationsByStatus: (status: string) => ['reservations', 4, status] as const,

  // 내 체험 관리
  activities: () => ['activities'] as const,

  // 예약 현황
  reservationTimeTable: (id: number, year: string, month: string) =>
    ['reservationTimeTable', id, year, month] as const,
};
export default queryKeys;
