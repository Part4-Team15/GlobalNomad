import { useNavigate, useParams } from 'react-router-dom';
import useWindowWidth from '@/hooks/useWindowWidth';
import useActivity from '@/hooks/useActivityQuery';

import Title from '@/components/activity/Title';
import Description from '@/components/activity/Description';
import Reviews from '@/components/activity/Reviews';
import ReserveForm from '@/components/activity/ReserveForm';
import ReserveBar from '@/components/activity/ReserveBar';
import ImageDashBoard from '@/components/activity/ImageDashBoard';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import ImageDashBoardSkeleton from '@/components/skeletonUI/activity/ImageDashBoardSkeleton';
import TitleSkeleton from '@/components/skeletonUI/activity/TitleSkeleton';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const windowWidth = useWindowWidth();

  if (!id) {
    navigate('/Error404');
  }

  // 유저 정보 가져오기
  const { userInfo, isLoading: userLoading, isError: userError } = useUserInfoQuery();

  // 체험 상세 정보 가져오기
  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useActivity(id || '');

  if (userLoading || activityLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-screen">
        <div className="lg:w-[1000px] md:w-11/12 sm:w-11/12 flex-col flex justify-center items-center gap-8 mt-16 mb-40 md:gap-10 sm:gap-0">
          <TitleSkeleton />
          <ImageDashBoardSkeleton />
        </div>
      </div>
    );
  }

  if (userError || !userInfo || activityError || !activity) {
    navigate('/Error404');
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full dark:bg-darkMode-black-10">
      <div className="lg:w-[1000px] md:w-11/12 sm:w-11/12 flex-col flex justify-center items-center gap-8 mt-12 sm:mt-4 mb-40 md:gap-10 sm:gap-4">
        <Title />
        <ImageDashBoard />
        {/* 내가 만든 체험인 경우, 예약카드 보이지 않도록 함 */}
        <div className="flex w-full gap-6 sm:gap-4">
          {activity.userId === userInfo.id ? (
            <div className="flex w-full flex-col">
              <Description />
              <Reviews />
            </div>
          ) : (
            <>
              <div />
              {windowWidth > 767 ? (
                <>
                  <div className="flex w-2/3 flex-col">
                    <Description />
                    <Reviews />
                  </div>
                  <div className="w-1/3">
                    <ReserveForm price={activity.price} />
                  </div>
                </>
              ) : (
                <div className="relative flex w-11/12 flex-col">
                  <Description />
                  <Reviews />
                  <ReserveBar price={activity.price} />
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
