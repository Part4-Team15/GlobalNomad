import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
// import postAssignImage from '@/api/postAssignImage';
import convertDate from '@/utils/convertDate';
import checkRequireData from './utils/checkRequireData';

const AssignHeader = () => {
  const data = useQuery({ queryKey: ['assignData'] }).data as AssignData;

  const handleAssignData = () => {
    if (checkRequireData(data)) {
      const resultArray = data.schedules.map((time) => {
        return time;
      });
      resultArray.forEach(({ date }) => {
        console.log(convertDate(date));
      });
      // 날짜변환 + 이미지 변환 후 post요청
      // const convertedImage = postAssignImage(data.bannerImageUrl);
      // console.log(convertedImage);
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
