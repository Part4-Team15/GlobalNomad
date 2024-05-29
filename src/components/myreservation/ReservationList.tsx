import getMyReservation from '@/api/getMyReservation';
import { useQuery } from '@tanstack/react-query';
import ReservationItem from './ReservationItem';

const ReservationList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: getMyReservation,
  });

  if (isLoading) {
    return <div>예약 목록을 불러오고 있습니다...</div>;
  }

  const { reservations } = data;
  return (
    <ul className="flex flex-col gap-6">
      {reservations.map((item: any) => {
        return (
          <ReservationItem
            title={item.activity.title}
            bannerImageUrl={item.activity.bannerImageUrl}
            status={item.status}
            date={item.date}
            headCount={item.headCount}
            totalPrice={item.totalPrice}
            startTime={item.startTime}
            endTime={item.endTime}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};
export default ReservationList;
