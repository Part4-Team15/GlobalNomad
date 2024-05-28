import CategoryFilter from '@/components/mainpage/CategoryFilter';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import ActivityCardList from '@/components/mainpage/ActivityCardList';
import PopularActivityList from '@/components/mainpage/PopularActivityList';

const MainPage = () => (
  <>
    <MainBanner />
    <div className="flex flex-col items-center">
      <div className="w-pc mb-32">
        <ActivitySearch />
        <PopularActivityList />
        <CategoryFilter />
        <div className="text-4xl font-bold mt-10 mb-[33px]">🛼 모든 체험</div>
        <ActivityCardList />
      </div>
    </div>
  </>
);

export default MainPage;
