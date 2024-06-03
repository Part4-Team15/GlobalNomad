import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import convertDate from '@/utils/convertDate';
import postAssignMyActivity from '@/api/postMyActivity';
import checkRequireData from './utils/checkRequireData';

const ModifyHeader = () => {
  const data = useQuery({ queryKey: ['assignData'] }).data as AssignData;

  const handleAssignData = async () => {
    if (checkRequireData(data)) {
      const transformedData: AssignData = {
        ...data,
        schedules: data.schedules.map((schedule) => ({
          ...schedule,
          date: convertDate(schedule.date),
        })),
      }; // 새로운 객체를 생성하여 날짜 변환
      try {
        const response = await postAssignMyActivity(transformedData);
        if (response) {
          alert('등록 성공!!'); // 성공 시 모달 열기
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

export default ModifyHeader;
