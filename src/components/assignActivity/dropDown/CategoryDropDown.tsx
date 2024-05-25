import React, { useState } from 'react';

interface CategoryProps {
  onSelect: (value: string) => void;
}

const CategoryDropDown = ({ onSelect }: CategoryProps) => {
  const category = ['문화 예술', '식음료', '스포츠', '투어', '관광'];
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSelectedCategory = (item: string) => () => {
    setSelectedCategory(item);
    onSelect(item);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[2px] shrink-0 rounded-md bg-white shadow-md">
      {category.map((item) => (
        <button
          key={item}
          onClick={handleSelectedCategory(item)}
          type="button"
          className={
            selectedCategory === item
              ? 'flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md bg-black text-white hover:bg-gray-30'
              : 'flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md hover:bg-gray-30'
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
  );
};

export default CategoryDropDown;
