import React, { useState, useEffect } from 'react';
import useMergeModifyData from '@/hooks/useMergeModifyData';

interface ModifyPriceProps {
  price: number;
}

const ModifyPrice = ({ price }: ModifyPriceProps) => {
  const { mergePriceNum, mergePriceStr } = useMergeModifyData();
  const [localPrice, setLocalPrice] = useState<number | string>(price);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    mergePriceNum(price);
  }, []);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;

    // 입력된 값이 숫자가 아니면 무시
    if (/[^0-9]/.test(newPrice)) {
      return;
    }
    setLocalPrice(newPrice);
    mergePriceStr(newPrice);
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <span className=" text-black text-2xl font-bold dark:text-darkMode-white-10">가격</span>
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
        <input
          type="number"
          className="w-[100%] outline-none dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
          value={localPrice}
          onChange={handleChangePrice}
          placeholder="숫자만 입력해주세요"
        />
      </div>
    </div>
  );
};

export default ModifyPrice;
