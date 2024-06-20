import MainBanner from '@/components/mainpage/MainBanner';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import PopularActivityList from '@/components/mainpage/PopularActivityList';
import ActivityCardList from '@/components/mainpage/ActivityCardList';
import RecentViewedActivity from '@/components/mainpage/RecentViewedActivity';

const MainPage = () => (
  <section className="flex flex-col items-center">
    <MainBanner />
    <div className="w-pc mb-32 lg:w-[1000px] md:w-tab sm:w-mob">
      <RecentViewedActivity />
      <ActivitySearch />
      <PopularActivityList />
      <ActivityCardList />
    </div>
  </section>
);

export default MainPage;
