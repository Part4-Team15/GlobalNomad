import useInfiniteMyActivity from '@/hooks/useInfiniteMyActivity';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import deleteMyActivity from '@/api/deleteMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import NoReservation from '../myReservationHistory/NoReservation';
import MyActivityCard from './MyActivityCard';

const MyActivityCardList = () => {
  const { myActivityData, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteMyActivity();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const activities = myActivityData?.pages.flatMap((page) => page.activities) || [];

  const queryClient = useQueryClient();

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
  );
};

export default MyActivityCardList;
