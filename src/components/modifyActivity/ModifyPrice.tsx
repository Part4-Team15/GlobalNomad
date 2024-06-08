import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ModifyData } from '@/types/modifyActivityPage';
import mergeModifyData from './utils/mergeModifyData';

interface ModifyPriceProps {
  price: number;
}

const ModifyPrice = ({ price }: ModifyPriceProps) => {
  const queryClient = useQueryClient();
  const [localPrice, setLocalPrice] = useState<number>(price);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { price });
    });
  }, []);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setLocalPrice(Number(newPrice) ? Number(newPrice) : 0);
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { price: Number(newPrice) ? Number(newPrice) : 0 });
    });
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <span className=" text-black text-2xl font-bold">가격</span>
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
        <input
          className="w-[100%] outline-none"
          value={localPrice}
          onChange={handleChangePrice}
          placeholder="숫자만 입력해주세요"
        />
      </div>
    </div>
  );
};

export default ModifyPrice;
