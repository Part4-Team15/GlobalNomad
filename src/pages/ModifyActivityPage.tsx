import React from 'react';
import Profile from '@/components/common/profile/Profile';
import ModifyHeader from '@/components/modifyActivity/ModifyHeader';
import ModifyTitle from '@/components/modifyActivity/ModifyTitle';
import ModifyCategory from '@/components/modifyActivity/ModifyCategory';
import ModifyDescription from '@/components/modifyActivity/ModifyDescription';
import ModifyPrice from '@/components/modifyActivity/ModifyPrice';
import ModifyAddress from '@/components/modifyActivity/ModifyAddress';
import ModifyReservationTime from '@/components/modifyActivity/ModifyReservationTime';
import ModifyBannerImage from '@/components/modifyActivity/ModifyBannerImage';
import ModifyIntroImage from '@/components/modifyActivity/ModifyIntroImage';

const ModifyActivityPage = () => (
  <div className="h-[100%] pt-[50px] pb-[50px] lg:pr-[150px] md:pr-[30px] sm:pr-[24px] lg:pl-[150px] md:pl-[30px] sm:pl-[24px]">
    {/* 패딩값 조절 필요 */}
    {/* 전체적인 크기 조절 + gap도 필요 */}
    <div className="w-[100%] inline-flex items-start gap-6">
      <Profile />
      <div className="w-[100%] flex flex-col items-start gap-6">
        <ModifyHeader />
        <ModifyTitle />
        <ModifyCategory />
        <ModifyDescription />
        <ModifyPrice />
        <ModifyAddress />
        <ModifyReservationTime />
        <ModifyBannerImage />
        <ModifyIntroImage />
        <span className=" text-gray-80 text-lg">*이미지는 최대 4개까지 등록 가능합니다.</span>
      </div>
    </div>
  </div>
);

export default ModifyActivityPage;
