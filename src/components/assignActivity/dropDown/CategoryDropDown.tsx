import React from 'react';
import { CATEGORIES, Category } from '@/types/category';
import useMergeAssignData from '@/hooks/useMergeAssignData';

interface CategoryProps {
  onSelect: (value: Category) => void;
}

const CategoryDropDown = ({ onSelect }: CategoryProps) => {
  const { mergeCategory } = useMergeAssignData();

  const handleSelectedCategory = (item: Category) => () => {
    mergeCategory(item);
    onSelect(item);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[2px] shrink-0 rounded-md bg-white shadow-md dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
      {CATEGORIES.map((item) => (
        <button
          key={item}
          onClick={handleSelectedCategory(item)}
          type="button"
          className="flex items-center w-[100%] pl-[36px] pt-2 pb-[6px] gap-2 rounded-md hover:bg-gray-30 dark:hover:bg-darkMode-gray-20"
        >
          <li className="flex text-[20px]">{item}</li>
        </button>
      ))}
    </ul>
  );
};

export default CategoryDropDown;
