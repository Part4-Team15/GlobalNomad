import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModifyHeader from '@/components/modifyActivity/ModifyHeader';
import ModifyTitle from '@/components/modifyActivity/ModifyTitle';
import ModifyCategory from '@/components/modifyActivity/ModifyCategory';
import ModifyDescription from '@/components/modifyActivity/ModifyDescription';
import ModifyPrice from '@/components/modifyActivity/ModifyPrice';
import ModifyAddress from '@/components/modifyActivity/ModifyAddress';
import ModifyReservationTime from '@/components/modifyActivity/ModifyReservationTime';
import ModifyBannerImage from '@/components/modifyActivity/ModifyBannerImage';
import ModifyIntroImage from '@/components/modifyActivity/ModifyIntroImage';
import getActivity from '@/api/getActivity';
import { ActivityType } from '@/types/activityPage';

const ModifyActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activityData, setActivityData] = useState<ActivityType | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/Error404');
      return;
    }

    const fetchActivity = async () => {
      try {
        const data = await getActivity(id);
        setActivityData(data);
      } catch (error) {
        console.error('Activity 데이터를 가져오는 데 실패했습니다:', error);
        navigate('/Error404');
      }
    };

    fetchActivity();
  }, [id]);

  if (!activityData) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <div className="w-[100%] max-w-[792px] flex flex-col items-start gap-6">
      {id && <ModifyHeader id={id} schedules={activityData.schedules} />}
      <ModifyTitle title={activityData.title} />
      <ModifyCategory category={activityData.category} />
      <ModifyDescription description={activityData.description} />
      <ModifyPrice price={activityData.price} />
      <ModifyAddress address={activityData.address} />
      <ModifyReservationTime schedules={activityData.schedules} />
      <ModifyBannerImage bannerImageUrl={activityData.bannerImageUrl} />
      <ModifyIntroImage subImages={activityData.subImages} />
      <span className=" text-gray-80 text-lg dark:text-darkMode-gray-10">
        *이미지는 최대 4개까지 등록 가능합니다.
      </span>
    </div>
  );
};

export default ModifyActivityPage;
