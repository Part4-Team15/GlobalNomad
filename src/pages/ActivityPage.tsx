import { useParams } from 'react-router-dom';

import TopBanner from '../components/activity/TopBanner';
// import Details from '../components/activity/Details';
// import Map from '../components/activity/Map';
// import ReserveForm from '../components/activity/ReserveForm';
// import Reviews from '../components/activity/Reviews';

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <h1>{id}번째 체험 상세 페이지입니다</h1>
      <TopBanner />
      {/* <Details />
      <Map />
      <ReserveForm />
      <Reviews /> */}
    </>
  );
};

export default ActivityPage;
