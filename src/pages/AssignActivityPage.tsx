import React from 'react';
import AssignTitle from '@/components/assignActivity/AssignTitle';
import AssignHeader from '@/components/assignActivity/AssignHeader';
import AssignCategory from '@/components/assignActivity/AssignCategory';
import AssignDescription from '@/components/assignActivity/AssignDescription';
import AssignPrice from '@/components/assignActivity/AssignPrice';
import AssignAddress from '@/components/assignActivity/AssignAddress';
import AssignReservationTime from '@/components/assignActivity/AssignReservationTime';
import AssignBannerImage from '@/components/assignActivity/AssignBannerImage';
import AssignIntroImage from '@/components/assignActivity/AssignIntroImage';

const AssignActivityPage = () => (
  <div className="w-[100%] max-w-[792px] flex flex-col items-start gap-6">
    <AssignHeader />
    <AssignTitle />
    <AssignCategory />
    <AssignDescription />
    <AssignPrice />
    <AssignAddress />
    <AssignReservationTime />
    <AssignBannerImage />
    <AssignIntroImage />
    <span className=" text-gray-80 text-lg dark:text-darkMode-gray-10">
      *이미지는 최대 4개까지 등록 가능합니다.
    </span>
  </div>
);

export default AssignActivityPage;
