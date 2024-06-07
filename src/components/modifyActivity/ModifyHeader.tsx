import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ModifyData } from '@/types/modifyActivityPage';
import patchModifyMyActivity from '@/api/patchMyActivity';
import checkRequireData from './utils/checkRequireData';

interface ModifyHeaderProps {
  id: string;
}

const ModifyHeader = ({ id }: ModifyHeaderProps) => {
  const data = useQuery({ queryKey: ['modifyData'] }).data as ModifyData;

  const handleModifyData = async () => {
    if (checkRequireData(data)) {
      try {
        const response = await patchModifyMyActivity(data, id);
        if (response) {
          alert('수정 완료!!'); // 성공 시 모달 열기
        }
      } catch (e) {
        console.error('Error:', e);
      }
    }
  };

  return (
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black font-bold text-[32px]">내 체험 수정</span>
      <button
        type="button"
        className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
        onClick={handleModifyData}
      >
        수정하기
      </button>
    </div>
  );
};

export default ModifyHeader;