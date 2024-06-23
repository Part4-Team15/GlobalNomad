import ReserveStatusContent from '@/components/reserveStatus/ReserveStatusContent';
import useInfiniteMyActivity from '@/hooks/useInfiniteMyActivity';
import React from 'react';

const ReserveStatusPage = () => {
  const { myActivityData } = useInfiniteMyActivity();
  const activities = myActivityData?.pages.flatMap((page) => page.activities) || [];

  return activities.length === 0 ? <div>등록된 체험이 없습니다</div> : <ReserveStatusContent />;
};

export default ReserveStatusPage;
