import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import SearchResultList from '@/components/mainpage/SearchResultList';

const SearchResultPage = () => {
  return (
    <>
      <MainBanner />
      <section className="flex flex-col items-center">
        <div className="w-pc mb-[332px] md:w-tab md:mb-[782px] sm:w-mob sm:mb-[514px]">
          <ActivitySearch />
          <SearchResultList />
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
