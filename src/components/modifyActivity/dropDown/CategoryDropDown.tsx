import React from 'react';
import { Category, CATEGORIES } from '@/types/category';
import useMergeModifyData from '@/hooks/useMergeModifyData';

interface CategoryProps {
  onSelect: (value: Category) => void;
}

const CategoryDropDown = ({ onSelect }: CategoryProps) => {
  const { mergeCategory } = useMergeModifyData();

  const handleSelectedCategory = (item: Category) => () => {
    mergeCategory(item);
    onSelect(item);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[2px] shrink-0 rounded-md bg-white shadow-md">
      {CATEGORIES.map((item) => (
        <button
          key={item}
          onClick={handleSelectedCategory(item)}
          type="button"
          className="flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md hover:bg-gray-30"
        >
          <li className="flex text-[20px]">{item}</li>
        </button>
      ))}
    </ul>
  );
};

export default CategoryDropDown;
