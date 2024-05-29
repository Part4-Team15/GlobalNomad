import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReserveForm from '@/components/activity/ReserveForm';
import TopBanner from '@/components/activity/TopBanner';
import Description from '@/components/activity/Description';
import Reviews from '@/components/activity/Reviews';
import getActivity from '@/api/getActivity';
import { ActivityType } from '@/types/activityPage';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-[1200px] flex-col flex justify-center items-center gap-20">
        <TopBanner activity={activity} />
        <div className="flex w-full">
          <div className="flex w-2/3 flex-col">
            <Description activity={activity} />
            <Reviews />
          </div>
          <div className="w-1/3">
            <ReserveForm activity={activity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
