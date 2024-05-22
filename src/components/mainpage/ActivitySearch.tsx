import { ChangeEvent, useState } from 'react';

const ActivitySearch = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <div>
      <label>무엇을 체험하고 싶으신가요?</label>
      <div>
        <input
          type="text"
          onChange={handleChange}
        />
        <img src="/assets/search_icon.svg" alt="search-icon" />
      </div>
      <div>{searchWord}</div>
    </div>
  );
};

export default ActivitySearch;
