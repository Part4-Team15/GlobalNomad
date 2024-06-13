import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ModifyData } from '@/types/modifyActivityPage';
import { Category } from '@/types/category';
import mergeModifyData from './utils/mergeModifyData';
import CategoryDropDown from './dropDown/CategoryDropDown';

interface ModifyCategoryProps {
  category: string;
}

const ModifyCategory = ({ category }: ModifyCategoryProps) => {
  const queryClient = useQueryClient();
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(category);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { category });
    });
  }, []);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSelect = (value: Category) => {
    setSelectedValue(value);
    setIsDropDown(false);
  };

  return (
    <div className=" w-[100%] relative">
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
        <input
          className="w-[100%] outline-none"
          value={selectedValue || ''}
          placeholder="카테고리"
          readOnly
        />
        <button type="button" onClick={handleDropDown}>
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
