import MainBanner from '@/components/mainpage/MainBanner';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import PopularActivityList from '@/components/mainpage/PopularActivityList';
import ActivityCardList from '@/components/mainpage/ActivityCardList';

const MainPage = () => (
  <>
    <MainBanner />
    <div className="flex flex-col items-center">
      <div className="w-pc mb-32 md:w-tab sm:w-mob">
        <ActivitySearch />
        <PopularActivityList />
        <ActivityCardList />
      </div>
    </div>
  </>
);

export default MainPage;
