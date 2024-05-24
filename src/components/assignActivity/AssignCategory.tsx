import React, { useState } from 'react';

const AssignCategory = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const category = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelectedCategory = (item: string) => () => {
    setSelectedCategory(item);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className=" w-[100%] relative">
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
        <input
          className="w-[100%] outline-none"
          onChange={handleInputChange}
          value={selectedCategory}
          placeholder="카테고리"
        />
        <button type="button" onClick={handleDropDown}>
          <img
            src={isDropDown ? '/assets/arrow_up.svg' : '/assets/arrow_down.svg'}
            alt="arrowDownIcon"
          />
        </button>
      </div>
      {isDropDown && (
        <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[2px] shrink-0 rounded-md bg-white shadow-md">
          {category.map((item) => (
            <button
              key={item}
              onClick={handleSelectedCategory(item)}
              type="button"
              className={
                selectedCategory === item
                  ? 'flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md bg-black text-white'
                  : 'flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md'
              }
            >
              {selectedCategory === item ? (
                <img
                  className=" w-[20px] h-[20px]"
                  src="/assets/check_icon.svg"
                  alt="checkIcon"
                />
              ) : (
                ''
              )}
              <li className="flex text-[20px]">{item}</li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignCategory;
