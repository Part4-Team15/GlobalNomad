import MainBanner from '../components/mainpage/MainBanner';

const MainPage = () => {
  const filterList = ['a', 'b', 'c', 'd'];
  return (
    <>
      <MainBanner />
      <div>search</div>
      <div>인기 체험🔥</div>
      <div>cardList</div>
      <div>
        {filterList.map((folder) => <div key={folder}>{folder}</div>)}
      </div>
      <div>🛼 모든 체험</div>
      <div>cardList</div>
      <div>pagination</div>
    </>
  );
};

export default MainPage;
