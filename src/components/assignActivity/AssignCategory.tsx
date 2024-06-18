import React, { useState } from 'react';
import { Category } from '@/types/category';
import CategoryDropDown from './dropDown/CategoryDropDown';

const AssignCategory = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<Category | null>(null);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelect = (value: Category) => {
    setSelectedValue(value);
    setIsDropDown(false);
  };

  return (
    <div className=" w-[100%] relative bg-white">
      <div
        className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60"
        onClick={handleDropDown}
      >
        <input
          className="w-[100%] outline-none"
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

export default AssignCategory;
