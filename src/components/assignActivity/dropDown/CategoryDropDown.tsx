import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import { CATEGORIES, Category } from '@/types/category';
import mergeAssignData from '../utils/mergeAssignData';

interface CategoryProps {
  onSelect: (value: Category) => void;
}

const CategoryDropDown = ({ onSelect }: CategoryProps) => {
  const queryClient = useQueryClient();

  const handleSelectedCategory = (item: Category) => () => {
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { category: item });
    });
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
