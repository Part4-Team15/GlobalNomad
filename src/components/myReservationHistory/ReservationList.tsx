import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ReservationListProps } from '@/types/myReservationHistory';
import { Reservation } from '@/types/activityPage';
import useInfiniteReservation from '@/hooks/useInfiniteReservation';
import ReservationItem from './ReservationItem';
import NoReservation from './NoReservation';
import '../../styles/customScrollbar.css';

const ReservationList = ({ status, onReviewClick }: ReservationListProps) => {
  const { reservationData, fetchNextPage } = useInfiniteReservation(status);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    } 
  }, [inView, fetchNextPage]);

  const reservations = reservationData?.pages.flatMap((page) => page.reservations) || [];

  return (
    <div className="h-[544px] overflow-y-auto custom-scrollbar">
      {!reservations.length ? (
        <NoReservation />
      ) : (
        <ul className="flex flex-col gap-6">
          {reservations.map((item: Reservation) => (
            <ReservationItem
              key={item.id}
              id={item.id}
              title={item.activity.title}
              bannerImageUrl={item.activity.bannerImageUrl}
              status={item.status}
              date={item.date}
              headCount={item.headCount}
              totalPrice={item.totalPrice}
              startTime={item.startTime}
              endTime={item.endTime}
              onReviewClick={onReviewClick}
              reviewSubmitted={item.reviewSubmitted}
            />
          ))}
        </ul>
      )}
      <div ref={ref} className="h-[10px]" />
    </div>
  );
};

export default ReservationList;
