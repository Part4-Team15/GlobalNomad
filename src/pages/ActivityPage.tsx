import TopBanner from '../components/activity/TopBanner';
import Description from '../components/activity/Description';
// import ReserveForm from '../components/activity/ReserveForm';
// import Reviews from '../components/activity/Reviews';

const ActivityPage = () => {
  console.log('hi');

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-[1200px] flex-col flex justify-center items-center gap-20">
        <TopBanner />
        <div className="flex w-full">
          <Description />
          {/* <ReserveForm /> */}
        </div>
        {/* <Reviews /> */}
      </div>
    </div>
  );
};

export default ActivityPage;
