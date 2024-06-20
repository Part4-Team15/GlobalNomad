import { ReservationItemProps } from '@/types/myReservationHistory';
import useReservationStatus from '@/hooks/useReservationStatus';
import ReservationDescription from './ReservationDescrition';

const ReservationItem = ({
  title,
  bannerImageUrl,
  status,
  date,
  totalPrice,
  headCount,
  startTime,
  endTime,
  id,
  reviewSubmitted,
  onReviewClick,
}: ReservationItemProps) => {
  const { textColor, reservationStatusText } = useReservationStatus(status);

  const dateArr = date.split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const formatDate = `${year}. ${month.replace(/^0/, '')}. ${day.replace(/^0/, '')}`;

  return (
    <li className="flex rounded-3xl gap-6 overflow-hidden shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] bg-white min-w-[21.5rem] md:h-[157px] md:gap-2 sm:h-[128px]">
      <img
        className="w-[204px] h-[204px] md:w-[157px] md:h-[157px] sm:w-[128px] sm:h-[128px]"
        src={`${bannerImageUrl}`}
        alt="activity_banner_image"
      />
      <ReservationDescription
        title={title}
        status={status}
        date={formatDate}
        startTime={startTime}
        endTime={endTime}
        headCount={headCount}
        totalPrice={totalPrice}
        textColor={textColor}
        reservationStatusText={reservationStatusText}
        id={id}
        onReviewClick={onReviewClick}
        bannerImageUrl={bannerImageUrl}
        reviewSubmitted={reviewSubmitted}
      />
    </li>
  );
};

export default ReservationItem;
