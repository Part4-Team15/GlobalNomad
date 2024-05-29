export interface SubImage {
  id: number;
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

export interface AvailableTimesType {
  date: string;
  times: [
    {
      id: number;
      startTime: string;
      endTime: string;
    },
  ];
}

interface User {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface Review {
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
