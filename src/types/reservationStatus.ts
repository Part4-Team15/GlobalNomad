import { Dispatch, SetStateAction } from 'react';

export interface Activity {
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
}

export interface ActivityDropDownProps {
  setViewActivityDropDown: Dispatch<SetStateAction<boolean>>;
  setSelectedActivity: Dispatch<SetStateAction<Activity | null>>;
  viewActivityDropDown: boolean;
}

export interface ReservationData {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface ScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ScheduleTimeDropDownProps {
  schedule: ScheduleType[];
  setSelelctedSchedule: React.Dispatch<React.SetStateAction<ScheduleType | null>>;
  viewScheduleTimeDropDown: boolean;
  setVieScheduleTimeDropDown: Dispatch<SetStateAction<boolean>>;
}

interface Reservation {
  id: number;
  status: string;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
}

export interface ReservationsResponse {
  reservations: Reservation[];
  totalCount: number;
  cursorId: number | null;
}

export interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservationModalProps {
  setViewReservationModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: { year: string; month: string; day: string | null };
  activitiyId: number;
  viewReservationModal: boolean;
}

export interface ReservationScheduleProps {
  reservationStatus: string;
  nickname: string;
  headCount: number;
  activityId: number;
  reservationId: number;
  setSelelctedSchedule: React.Dispatch<React.SetStateAction<ScheduleType | null>>;
  fetchNextPage: () => void;
  inView: boolean;
}
