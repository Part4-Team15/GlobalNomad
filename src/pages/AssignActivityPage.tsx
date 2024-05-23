import React from 'react';
import AssignTitle from '../components/assignActivity/AssignTitle';
import AssignHeader from '../components/assignActivity/AssignHeader';
import Profile from '../components/common/profile/Profile';
import AssignCategory from '../components/assignActivity/AssignCategory';
import AssignDescription from '../components/assignActivity/AssignDescription';
import AssignPrice from '../components/assignActivity/AssignPrice';
import AssignAddress from '../components/assignActivity/AssignAddress';
import AssignReservationTime from '../components/assignActivity/AssignReservationTime';

const AssignActivityPage = () => (
  <div className="h-[100%] pr-[100px] pl-[100px]">
    {/* 패딩값 조절 필요 */}
    {/* 전체적인 크기 조절 + gap도 필요 */}
    <div className="w-[100%] inline-flex items-start gap-6">
      <Profile />
      <div className="w-[100%] flex flex-col items-start gap-6">
        <AssignHeader />
        <AssignTitle />
        <AssignCategory />
        <AssignDescription />
        <AssignPrice />
        <AssignAddress />
        <AssignReservationTime />
      </div>
    </div>
  </div>
);

export default AssignActivityPage;
