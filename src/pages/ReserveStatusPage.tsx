import NoReservation from '@/components/myReservationHistory/NoReservation';
import ReserveStatusContent from '@/components/reserveStatus/ReserveStatusContent';
import useInfiniteMyActivity from '@/hooks/useInfiniteMyActivity';
import React from 'react';

const ReserveStatusPage = () => {
  const { myActivityData } = useInfiniteMyActivity();
  const activities = myActivityData?.pages.flatMap((page) => page.activities) || [];

  return activities.length === 0 ? (
    <div>
      <h1 className="text-[32px] font-bold text-black mb-8 dark:text-darkMode-white-10">
        예약 현황
      </h1>
      <NoReservation />
    </div>
  ) : (
    <ReserveStatusContent />
  );
};

export default ReserveStatusPage;
