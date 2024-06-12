export interface SubImage {
  id?: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
}

export interface User {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Review {
  id: number;
  user: User;
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReviewsType {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
}

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableReservationsType {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export interface AvailableSchedulesType {
  date: string;
  times: [
    {
      id: number;
      startTime: string;
      endTime: string;
    },
  ];
}

export interface AvailableTime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface AvailableDate {
  date: string;
  times: AvailableTime[];
}
