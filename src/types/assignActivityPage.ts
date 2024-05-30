export interface ReservationTime {
  reservationDate: string; // 예약 날짜
  startTime: string; // 시작 시간
  endTime: string; // 종료 시간
}

export interface AssignData {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  introImageUrl?: string[];
  reservationTime: ReservationTime[];
}
