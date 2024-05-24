import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReserveForm from '@/components/activity/ReserveForm';
import TopBanner from '@/components/activity/TopBanner';
import Description from '@/components/activity/Description';
import Reviews from '@/components/activity/Reviews';
import axios from '@/lib/axios';

const ActivityPage = () => {
  const { id } = useParams() as { id: string };

  const [activity, setActivity] = useState({
    title: '',
    category: '',
    rating: '',
    address: '',
    reviewCount: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/activities/${id}`);
      setActivity(response.data);
    };
    getData();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-[1200px] flex-col flex justify-center items-center gap-20">
        <TopBanner activity={activity} />
        <div className="flex w-full">
          <div className="flex w-2/3 flex-col">
            <Description activity={activity} />
            <Reviews id={id} />
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
