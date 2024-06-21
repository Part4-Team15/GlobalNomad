import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import SearchResultList from '@/components/mainpage/SearchResultList';

const SearchResultPage = () => {
  return (
    <>
      <MainBanner />
      <section className="flex flex-col justify-center items-center w-full">
        <div className="min-w-pc mb-[332px] bg-gray-10 dark:bg-darkMode-black-10 md:w-tab md:mb-[782px] sm:w-mob sm:mb-[514px]">
          <ActivitySearch />
          <SearchResultList />
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
