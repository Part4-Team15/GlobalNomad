import InfiniteScroll from 'react-infinite-scroll-component';
import Profile from '@/components/common/profile/Profile';
import ReservationCard, { Activity } from '@/components/myActivity/ReservationCard';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import NoReservation from '@/components/myreservation/NoReservation';

interface ApiResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

const MyActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>('/my-activities', {
          params: {
            page,
            limit: 5,
            sort: 'createdAt,desc',
          },
        });

        const newActivities = response.data.activities;
        const uniqueActivities = [...activities, ...newActivities].filter(
          (activity, index, self) => index === self.findIndex((t) => t.id === activity.id),
        );

        setActivities(uniqueActivities);
        setHasMore(newActivities.length === 5);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleAssignClick = () => {
    navigate('/my-activity/assign');
  };

  const handleDeleteActivity = (id: number) => {
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
  };

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
              <InfiniteScroll
                dataLength={activities.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more activities to show</p>}
              >
                <ul className="flex flex-col gap-6">
                  {activities.map((activity) => (
                    <ReservationCard
                      key={activity.id}
                      activity={activity}
                      onDelete={handleDeleteActivity}
                    />
                  ))}
                </ul>
              </InfiniteScroll>
            ) : (
              <NoReservation />
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default MyActivityPage;
