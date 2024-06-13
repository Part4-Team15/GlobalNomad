export interface ReservationDescriptionProps {
  title: string;
  status: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  textColor: string;
  reservationStatusText: string;
  bannerImageUrl: string;
  id: number;
  onReviewClick: (data: BookingData) => void;
  reviewSubmitted: boolean;
}

interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

// 예약 정보에 대한 인터페이스
export interface Reservation {
  activity: Activity;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

// 페이지 정보에 대한 인터페이스
export interface Page {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number;
}

// 전체 데이터 구조에 대한 인터페이스
export interface PaginatedReservations {
  pages: Page[];
  pageParams: number[];
}

export interface ReservationListProps {
  status: string;
  onReviewClick: (data: BookingData) => void;
}

export interface ReservationContentProps {
  status: string;
  setStatus: (status: string) => void;
  onReviewClick: (data: BookingData) => void;
}

export interface ReservationItemProps {
  title: string;
  bannerImageUrl: string;
  status: string;
  date: string; // YYYY-MM-DD
  totalPrice: number;
  headCount: number;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  id: number;
  onReviewClick: (data: BookingData) => void;
  reviewSubmitted: boolean;
}

export interface BookingData {
  id: number;
  bannerImageUrl: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
}
