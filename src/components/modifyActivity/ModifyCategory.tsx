import React, { useState, useEffect } from 'react';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import { Category } from '@/types/category';
import CategoryDropDown from './dropDown/CategoryDropDown';

interface ModifyCategoryProps {
  category: string;
}

const ModifyCategory = ({ category }: ModifyCategoryProps) => {
  const { mergeCategory } = useMergeModifyData();
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(category);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    mergeCategory(category);
  }, []);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelect = (value: Category) => {
    setSelectedValue(value);
    setIsDropDown(false);
  };

  return (
    <div className=" w-[100%] relative ">
      <div
        className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
        onClick={handleDropDown}
      >
        <input
          className="w-[100%] outline-none cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10 "
          value={selectedValue || ''}
          placeholder="카테고리"
          readOnly
        />
        <button type="button">
          <img
            src={isDropDown ? '/assets/arrow_up.svg' : '/assets/arrow_down.svg'}
            alt="arrowDownIcon"
          />
        </button>
      </div>
      {isDropDown && <CategoryDropDown onSelect={handleSelect} />}
    </div>
  );
};

export default ModifyCategory;
