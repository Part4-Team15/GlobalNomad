import Profile from '@/components/common/profile/Profile';
import ReservationCard from '@/components/myActivity/ReservationCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoReservation from '@/components/myreservation/NoReservation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import getMyActivity from '@/api/getMyActivity';
import { useInView } from 'react-intersection-observer';

const MyActivityPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: getMyActivity,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const activities = data?.pages.flatMap((page) => page.activities) || [];

  const handleAssignClick = () => {
    navigate('/my-activity/assign');
  };

  const handleDeleteActivity = async () => {
    await queryClient.invalidateQueries({ queryKey: ['activities'] });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src="/assets/spinner.svg" alt="loding_spinner" />
      </div>
    );
  }

  return (
    <section className=" bg-gray-10 px-4 py-16">
      <div className="flex max-w-[75rem] mx-auto gap-6 items-start">
        <Profile />
        {/* 내 체험 관리 헤더 */}
        <div className="w-full">
          <div className="min-w-[21.5rem] flex justify-between mb-6">
            <h2 className=" text-black font-bold text-[32px] self-start">내 체험 관리</h2>
            <button
              type="button"
              className="flex min-w-[7.5rem] h-12 p-2.5 justify-center items-center gap-1 self-stretch rounded bg-[#121] text-white"
              onClick={handleAssignClick}
            >
              체험 등록하기
            </button>
          </div>
          {/* 체험 리스트 */}
          <section className="w-full">
            {activities.length !== 0 ? (
              <>
                <ul className="flex flex-col gap-6">
                  {activities.map((activity) => (
                    <ReservationCard
                      key={activity.id}
                      activity={activity}
                      onDelete={() => handleDeleteActivity()}
                    />
                  ))}
                </ul>
                {isFetchingNextPage && (
                  <div className="flex justify-center items-center">
                    <img src="/assets/spinner.svg" alt="loding_spinner" />
                  </div>
                )}
              </>
            ) : (
              <NoReservation />
            )}
            <div ref={ref} className="h-[10px]" />
          </section>
        </div>
      </div>
    </section>
  );
};

export default MyActivityPage;
