import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ModifyData } from '@/types/modifyActivityPage';
import patchModifyMyActivity from '@/api/patchMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import Toast from '@/utils/Toast';
import useCheckModifyData from '@/hooks/useCheckModifyData';

interface ModifyHeaderProps {
  id: string;
}

const ModifyHeader = ({ id }: ModifyHeaderProps) => {
  const navigate = useNavigate();
  const { checkRequireData } = useCheckModifyData();
  const data = useQuery({ queryKey: queryKeys.modifyData() }).data as ModifyData;

  const handleModifyData = async () => {
    if (checkRequireData(data)) {
      // 1차 검사 (비어있는 폼 검사)
      try {
        const response = await patchModifyMyActivity(data, id);
        // 2차 검사 (예약이 있는 시간대를 삭제했는지 -> 삭제되면 안되는것이 삭제되었는지)
        // 이때는 오류가 나면 시간대를 다시 돌려줘야하므로 새로고침을 하도록
        if (response) {
          Toast.success('수정 완료!!');
          navigate('/my/activity');
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
