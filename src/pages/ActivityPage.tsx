import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReserveForm from '@/components/activity/ReserveForm';
import TopBanner from '@/components/activity/TopBanner';
import Description from '@/components/activity/Description';
import Reviews from '@/components/activity/Reviews';
import getActivity from '@/api/getActivity';
import { ActivityType } from '@/types/activityPage';
import getUserInfo from '@/api/getUserInfo';
import { useQuery } from '@tanstack/react-query';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  const [activity, setActivity] = useState<ActivityType>({
    id: 0,
    userId: 0,
    title: '',
    description: '',
    category: '',
    price: 0,
    address: '',
    bannerImageUrl: '',
    rating: 0,
    reviewCount: 0,
    createdAt: '',
    updatedAt: '',
    subImages: [],
    schedules: [],
  });

  useEffect(() => {
    if (!id) {
      navigate('/Error404');
      return;
    }

    const fetchActivity = async () => {
      try {
        const activityData = await getActivity(id);
        setActivity(activityData);
      } catch (error) {
        console.error('Activity 데이터를 가져오는 데 실패했습니다:', error);
        navigate('/Error404');
      }
    };

    fetchActivity();
  }, [id]);

  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-[1200px] flex-col flex justify-center items-center gap-20 mb-40">
        <TopBanner activity={activity} />
        <div className="flex w-full gap-6">
          {activity.userId === data.id ? (
            <div className="flex w-full flex-col">
              <Description activity={activity} />
              <Reviews />
            </div>
          ) : (
            <>
              <div className="flex w-2/3 flex-col">
                <Description activity={activity} />
                <Reviews />
              </div>
              <div className="w-1/3">
                <ReserveForm activity={activity} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
