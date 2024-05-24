import CategoryFilter from '../components/mainpage/CategoryFilter';
import ActivityCard from '../components/mainpage/ActivityCard';
import ActivitySearch from '../components/mainpage/ActivitySearch';
import MainBanner from '../components/mainpage/MainBanner';

const MainPage = () => (
  <>
    <MainBanner />
    <div className="flex flex-col items-center">
      <ActivitySearch />
      <div className="text-4xl font-bold pt-10">🔥인기 체험</div>
      <ActivityCard />
      <CategoryFilter />
      <div className="text-4xl font-bold">🛼 모든 체험</div>
      <div>cardList</div>
      <div>pagination</div>
    </div>
  </>
);

export default MainPage;
