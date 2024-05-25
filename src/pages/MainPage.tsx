import CategoryFilter from '@/components/mainpage/CategoryFilter';
import ActivityCard from '@/components/mainpage/ActivityCard';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import Pagination from '@/components/mainpage/Pagination';

const MainPage = () => (
  <>
    <MainBanner />
    <div className="flex flex-col items-center">
      <ActivitySearch />
      <div className="w-[1200px] mt-10">
        <div className="text-4xl font-bold mb-[33px]">🔥인기 체험</div>
        <ActivityCard />
        <CategoryFilter />
        <div className="text-4xl font-bold mb-[33px]">🛼 모든 체험</div>
        <ActivityCard />
        <Pagination count={8} />
      </div>
    </div>
  </>
);

export default MainPage;
