import React, { useState } from 'react';
import Category from './dropDown/Category';

const AssignCategory = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className=" w-[100%] relative">
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
        <input
          className="w-[100%] outline-none"
          value={selectedValue}
          placeholder="카테고리"
        />
        <button type="button" onClick={handleDropDown}>
          <img
            src={isDropDown ? '/assets/arrow_up.svg' : '/assets/arrow_down.svg'}
            alt="arrowDownIcon"
          />
        </button>
      </div>
      {isDropDown && <Category onSelect={handleSelect} />}
    </div>
  );
};

export default AssignCategory;
