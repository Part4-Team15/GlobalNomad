import getMyReservation from '@/api/getMyReservation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ReservationItem from './ReservationItem';
import NoReservation from './NoReservation';

interface Activity {
  title: string;
  bannerImageUrl: string;
}
interface Reservation {
  id: number;
  activity: Activity;
  status: string;
  date: string;
  headCount: number;
  totalPrice: number;
  startTime: string;
  endTime: string;
}
interface ReservationListProps {
  status: string;
  onReviewClick: (bookingId: number) => void;
}

const ReservationList = ({ status, onReviewClick }: ReservationListProps) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['reservations', 4, status],
    queryFn: getMyReservation,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const reservations = data?.pages.flatMap((page) => page.reservations) || [];

  return (
    <div className="h-[544px] overflow-y-auto">
      {reservations.length !== 0 ? (
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
            />
          ))}
        </ul>
      ) : (
        <NoReservation />
      )}
      <div ref={ref} className="h-[10px]" />
    </div>
  );
};

export default ReservationList;
