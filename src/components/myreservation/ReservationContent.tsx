import ReservationFilter from './ReservationFilter';
import ReservationList from './ReservationList';

interface ReservationContentProps {
  status: string;
  setStatus: (status: string) => void;
}
const ReservationContent = ({ status, setStatus }: ReservationContentProps) => (
  <div className="flex w-[768px] flex-col gap-6">
    <div className="flex justify-between">
      <div className="font-bold text-[32px]">예약 내역</div>
      <ReservationFilter setStatus={setStatus} />
    </div>
    <ReservationList status={status} />
  </div>
);

export default ReservationContent;
