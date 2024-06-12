import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AssignData } from '@/types/assignActivityPage';
import postAssignMyActivity from '@/api/postMyActivity';
import Toast from '@/utils/Toast';
import checkRequireData from './utils/checkRequireData';

const AssignHeader = () => {
  const navigate = useNavigate();
  const data = useQuery({ queryKey: ['assignData'] }).data as AssignData;

  const handleAssignData = async () => {
    if (checkRequireData(data)) {
      try {
        const response = await postAssignMyActivity(data);
        if (response) {
          Toast.success('등록 성공!!'); // 성공 시 모달 열기
          navigate('/my/activity');
        }
      } catch (e) {
        console.error('Error:', e);
      }
    }
  };

  return (
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black font-bold text-[32px]">내 체험 등록</span>
      <button
        type="button"
        className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
        onClick={handleAssignData}
      >
        등록하기
      </button>
    </div>
  );
};

export default AssignHeader;
