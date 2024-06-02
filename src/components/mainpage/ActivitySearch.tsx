import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivitySearch = () => {
  const [searchWord, setSearchWord] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchWord}`);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchWord === '') navigate('/');
    else navigate(`/search?keyword=${searchWord}`);
  };

  return (
    <div className="relative bg-white pb-32">
      <form
        className="absolute -top-14 flex flex-col gap-8 px-6 py-8 shadow-lg rounded-2xl bg-white"
        onSubmit={handleSubmit}
      >
        <label className="text-black text-xl font-bold">무엇을 체험하고 싶으신가요?</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              className="w-[62.5rem] h-14 border border-gray-60 border-solid rounded-md px-4 py-2 placeholder:pl-5 focus:outline-none focus:border-green-40"
              type="search"
              value={searchWord}
              onChange={handleChange}
              placeholder="내가 원하는 체험은"
            />
            <img
              className="absolute top-4 left-2"
              src="/assets/search_icon.svg"
              alt="search-icon"
            />
          </div>
          <button
            className="bg-nomad-black rounded-md w-[136px] h-14 px-10 py-2 text-white font-bold"
            type="submit"
            onClick={handleClick}
          >
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivitySearch;
