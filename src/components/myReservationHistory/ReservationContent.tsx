import { ReservationContentProps } from '@/types/myReservationHistory';
import ReservationFilter from './ReservationFilter';
import ReservationList from './ReservationList';

const ReservationContent = ({
  status,
  setStatus,
  onReviewClick,
}: ReservationContentProps) => (
  <div className="flex w-[792px] flex-col gap-6 md:w-full sm:w-full">
    <div className="flex justify-between">
      <h1 className="font-bold text-[32px] text-[#1B1B1B]">예약 내역</h1>
      <ReservationFilter setStatus={setStatus} />
    </div>
    <ReservationList
      status={status}
      onReviewClick={onReviewClick}
    />
  </div>
);

export default ReservationContent;
