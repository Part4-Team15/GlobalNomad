import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import getActivity from '@/api/getActivity';
import getUserInfo from '@/api/getUserInfo';
import { ActivityType } from '@/types/activityPage';
import useWindowWidth from '@/hooks/useWindowWidth';

import TopBanner from '@/components/activity/TopBanner';
import Description from '@/components/activity/Description';
import Reviews from '@/components/activity/Reviews';
import ReserveForm from '@/components/activity/ReserveForm';
import ReserveBar from '@/components/activity/ReserveBar';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const windowWidth = useWindowWidth();

  if (!id) {
    navigate('/Error404');
  }

  // 유저 정보 가져오기
  const {
    data: userInfo,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  // 체험 상세 정보 가져오기
  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useQuery<ActivityType>({
    queryKey: ['activity', id],
    queryFn: async () => {
      if (typeof id === 'undefined') {
        throw new Error('해당 체험은 존재하지 않습니다');
      }
      return getActivity(id);
    },
    enabled: !!id,
  });

  if (userLoading || activityLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (userError || !userInfo || activityError || !activity) {
    navigate('/Error404');
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="lg:w-[1000px] md:w-11/12 sm:w-11/12 flex-col flex justify-center items-center gap-20 mb-40 md:gap-10 sm:gap-0">
        <TopBanner activity={activity} />
        {/* 내가 만든 체험인 경우, 예약카드 보이지 않도록 함 */}
        <div className="flex w-full gap-6 sm:gap-4">
          {activity.userId === userInfo.id ? (
            <div className="flex w-full flex-col">
              <Description activity={activity} />
              <Reviews />
            </div>
          ) : (
            <>
              <div />
              {windowWidth > 767 ? (
                <>
                  <div className="flex w-2/3 flex-col">
                    <Description activity={activity} />
                    <Reviews />
                  </div>
                  <div className="w-1/3">
                    <ReserveForm activity={activity} />
                  </div>
                </>
              ) : (
                <div className="relative flex w-11/12 flex-col">
                  <Description activity={activity} />
                  <Reviews />
                  <ReserveBar activity={activity} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
