import ReservationFilter from './ReservationFilter';
import ReservationList from './ReservationList';

const ReservationContent = () => (
  <div className="flex w-[768px] flex-col gap-6">
    <div className="flex justify-between">
      <div className="font-bold text-[32px]">예약 내역</div>
      <ReservationFilter />
    </div>
    <ReservationList />
  </div>
);

export default ReservationContent;
