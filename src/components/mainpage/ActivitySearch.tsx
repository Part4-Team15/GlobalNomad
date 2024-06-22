import { FormEvent, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './assets/search_icon.svg';

const ActivitySearch = () => {
  const searchWord = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = searchWord.current?.value;
    navigate(`/search?keyword=${inputValue || keyword}`);
  };

  return (
    <div className="relative bg-none pb-[118px] sm:pb-[73px]">
      <form
        className="absolute -top-14 flex flex-col gap-8 w-full px-6 py-8 shadow-custom rounded-2xl bg-white
        dark:bg-darkMode-black-40 dark:shadow-darkMode-black-40 lg:w-[1000px] sm:gap-[15px] sm:py-4"
        onSubmit={handleSubmit}
      >
        <label className="text-black text-xl font-bold dark:text-darkMode-white-10 sm:text-base">무엇을 체험하고 싶으신가요?</label>
        <div className="flex items-center gap-3 peer">
          <div className="relative flex items-center w-[1004px] h-14 border border-gray-60 border-solid rounded-md
          lg:w-[952px] md:w-[500px] sm:w-[187px] focus-within:border-green-40 focus-within:dark:border-darkMode-white-30"
          >
            <div className="w-6 h-6 m-3 md:m-2 sm:m-2">
              <SearchIcon className="fill-green-80 dark:fill-darkMode-gray-10"/>
            </div>
            {keyword && <p className="absolute -top-3 left-9 bg-white px-1 text-gray-70 dark:bg-darkMode-black-40 dark:text-darkMode-white-30">내가 원하는 체험은</p>}
            <input
              className="outline-none w-[916px] placeholder:pl-1 dark:bg-darkMode-black-40 dark:text-darkMode-white-10 
              placeholder:dark:text-darkMode-white-10 lg:w-[730px] md:w-[436px] sm:w-[124px]"
              type="search"
              ref={searchWord}
              defaultValue={keyword || ''}
              placeholder="내가 원하는 체험은"
            />
          </div>
          <button
            className="bg-nomad-black rounded-md min-w-[136px] h-14 px-10 py-2 text-white font-bold
              dark:bg-darkMode-gray-10 dark:text-darkMode-white-10 sm:min-w-24 sm:px-5"
            type="submit"
          >
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivitySearch;
