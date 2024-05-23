import ActivityCard from '../components/mainpage/ActivityCard';
import ActivitySearch from '../components/mainpage/ActivitySearch';
import MainBanner from '../components/mainpage/MainBanner';

const MainPage = () => {
  const filterList = ['a', 'b', 'c', 'd'];
  return (
    <>
      <MainBanner />
      <div className="flex flex-col items-center">
        <ActivitySearch />
        <div className="text-4xl font-bold pt-10">🔥인기 체험</div>
        <ActivityCard />
        <div>
          {filterList.map((folder) => <div key={folder}>{folder}</div>)}
        </div>
        <div>🛼 모든 체험</div>
        <div>cardList</div>
        <div>pagination</div>
      </div>
    </>
  );
};

export default MainPage;
