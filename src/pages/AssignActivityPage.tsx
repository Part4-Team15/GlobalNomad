import React from 'react';
import AssignTitle from '@/components/assignActivity/AssignTitle';
import AssignHeader from '@/components/assignActivity/AssignHeader';
import Profile from '@/components/common/profile/MyPageProfile';
import AssignCategory from '@/components/assignActivity/AssignCategory';
import AssignDescription from '@/components/assignActivity/AssignDescription';
import AssignPrice from '@/components/assignActivity/AssignPrice';
import AssignAddress from '@/components/assignActivity/AssignAddress';
import AssignReservationTime from '@/components/assignActivity/AssignReservationTime';
import AssignBannerImage from '@/components/assignActivity/AssignBannerImage';
import AssignIntroImage from '@/components/assignActivity/AssignIntroImage';

const AssignActivityPage = () => (
  <div className="h-[100%] pt-[50px] pb-[50px] lg:pr-[150px] md:pr-[30px] sm:pr-[24px] lg:pl-[150px] md:pl-[30px] sm:pl-[24px]">
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
        <AssignBannerImage />
        <AssignIntroImage />
        <span className=" text-gray-80 text-lg">*이미지는 최대 4개까지 등록 가능합니다.</span>
      </div>
    </div>
  </div>
);

export default AssignActivityPage;
