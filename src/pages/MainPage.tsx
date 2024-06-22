import MainBanner from '@/components/mainpage/MainBanner';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import PopularActivityList from '@/components/mainpage/PopularActivityList';
import ActivityCardList from '@/components/mainpage/ActivityCardList';
import RecentViewedActivity from '@/components/mainpage/RecentViewedActivity';

const MainPage = () => (
  <div className="flex flex-col justify-center items-center w-full">
    <MainBanner />
    <div className="min-w-pc mb-32 bg-gray-10 dark:bg-darkMode-black-10 lg:w-[1000px] md:w-tab sm:w-mob">
      <RecentViewedActivity />
      <ActivitySearch />
      <PopularActivityList />
      <ActivityCardList />
    </div>
  </div>
);

export default MainPage;
