import Profile from '@/components/common/profile/Profile';
import ReservationCard, { Activity } from '@/components/myActivity/ReservationCard';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

const MyActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>('/my-activities');
        setActivities(response.data.activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

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
            <ul className="flex flex-col gap-6">
              {activities.map((activity) => (
                <ReservationCard
                  key={activity.id}
                  activity={activity}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default MyActivityPage;
