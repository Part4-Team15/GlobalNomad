import Profile from '@/components/common/profile/Profile';
import ReserveStatusContent from '@/components/reserveStatus/ReserveStatusContent';
import React from 'react';

const ReserveStatusPage = () => (
  <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
    <Profile />
    <ReserveStatusContent />
  </div>
);

export default ReserveStatusPage;
