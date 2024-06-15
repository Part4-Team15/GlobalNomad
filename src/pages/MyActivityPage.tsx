import { useEffect } from 'react';
import NoReservation from '@/components/myReservationHistory/NoReservation';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import deleteMyActivity from '@/api/deleteMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import useInfiniteMyActivity from '@/hooks/useInfiniteMyActivity';
import MyActivityCard from '@/components/myActivity/MyActivityCard';
import MyActivityCardHeader from '@/components/myActivity/MyActivityCardHeader';

const MyActivityPage = () => {
  const queryClient = useQueryClient();
  const { myActivityData, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteMyActivity();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const activities = myActivityData?.pages.flatMap((page) => page.activities) || [];

  const handleDeleteActivity = async (id: string) => {
    try {
      await deleteMyActivity(id);
    } catch (error) {
      console.log('Failed to delete activity:', error);
    }
    await queryClient.invalidateQueries({ queryKey: queryKeys.activities() });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src="/assets/spinner.svg" alt="loding_spinner" />
      </div>
    );
  }
  return (
    <section className="flex flex-col w-full max-w-[50rem] items-start">
      <MyActivityCardHeader />
      {/* 체험 리스트 */}
      <div className="w-full h-[34rem] overflow-y-auto custom-scrollbar">
        {activities.length !== 0 ? (
          <>
            <ul className="flex flex-col gap-6">
              {activities.map((activity) => (
                <MyActivityCard
                  key={activity.id}
                  activity={activity}
                  onDelete={() => handleDeleteActivity(`${activity.id}`)}
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
        <div ref={ref} className="h-[1.5rem]" />
      </div>
    </section>
  );
};

export default MyActivityPage;
