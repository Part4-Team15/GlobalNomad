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
    <li className="rounded-3xl flex w-full h-[12.75rem] md:h-[9.75rem] sm:h-32 sm:min-w-[21.5rem] shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] bg-white dark:bg-darkMode-black-20">
      <div className="w-[12.75rem] h-[12.75rem] md:w-[9.75rem] md:h-[9.75rem] sm:w-32 sm:h-32">
        <img
          className="w-full h-full object-cover rounded-l-3xl"
          src={`${bannerImageUrl}`}
          alt="activity_banner_image"
        />
      </div>

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
