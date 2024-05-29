import getMyReservation from '@/api/getMyReservation';
import { useQuery } from '@tanstack/react-query';
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
}
const ReservationList = ({ status }: ReservationListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['reservations', status],
    queryFn: getMyReservation,
  });

  if (isLoading) {
    return <div>예약 목록을 불러오고 있습니다...</div>;
  }

  const { reservations } = data;
  return (
    <div>
      {reservations.length !== 0 ? (
        <ul className="flex flex-col gap-6">
          {reservations.map((item: Reservation) => {
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
      ) : (
        <NoReservation />
      )}
    </div>
  );
};
export default ReservationList;
