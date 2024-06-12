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
  onReviewClick: () => void;
}
