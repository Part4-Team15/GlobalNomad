import ReservationFilter from './ReservationFilter';
import ReservationList from './ReservationList';

interface ReservationContentProps {
  status: string;
  setStatus: (status: string) => void;
  onReviewClick: (bookingId: number) => void;
}
const ReservationContent = ({ status, setStatus, onReviewClick }: ReservationContentProps) => (
  <div className="flex w-[792px] flex-col gap-6">
    <div className="flex justify-between">
      <div className="font-bold text-[32px] text-[#1B1B1B]">예약 내역</div>
      <ReservationFilter setStatus={setStatus} />
    </div>
    <ReservationList status={status} onReviewClick={onReviewClick} />
  </div>
);

export default ReservationContent;
