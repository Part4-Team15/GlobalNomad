import { useParams } from 'react-router-dom';

import TopBanner from '../components/activity/TopBanner';
import Description from '../components/activity/Description';
// import Map from '../components/activity/Map';
// import ReserveForm from '../components/activity/ReserveForm';
// import Reviews from '../components/activity/Reviews';

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <h1>{id}번째 체험 상세 페이지입니다</h1>
      <div className="w-[1200px] flex-col flex justify-center items-center gap-20">
        <TopBanner />
        <Description />
        {/* <Map />
        <ReserveForm />
        <Reviews /> */}
      </div>
    </div>
  );
};

export default ActivityPage;
