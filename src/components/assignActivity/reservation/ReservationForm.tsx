import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AssignData, Schedule } from '@/types/assignActivityPage';
import mergeAssignData from '../utils/mergeAssignData';

// 추가된 시간대 내역들 보여주는 컴포넌트
const ReservationForm = () => {
  const queryClient = useQueryClient();

  const data = useQuery({ queryKey: ['assignData'] }).data as AssignData;
  const time: Schedule[] = data ? data.schedules : [];

  const handleRemoveReservationTime = (index: number): void => {
    const updatedTimes = time.filter((_, i) => i !== index);
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { schedules: updatedTimes });
    });
  };

  return (
    <div className="flex w-[100%] flex-col items-start gap-[21px]">
      <div className="border-t-2 border-gray-30 w-full" />

      {time.map((reservation, index) => (
        <div
          key={reservation.date + reservation.startTime + reservation.endTime}
          className="flex w-[100%] items-center gap-5"
        >
          {/* 날짜 */}
          <div className="flex w-[100%] flex-col">
            <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
              <input
                className="w-[100%] outline-none"
                value={reservation.date}
                readOnly
              />
            </div>
          </div>
          {/* 날짜 */}

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            {/* 시작 시간 */}
            <div className="flex w-[100%] flex-col ">
              <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                <input
                  className="w-[100%] outline-none"
                  value={reservation.startTime}
                  readOnly
                />
              </div>
            </div>
            {/* 시작 시간 */}

            <span>~</span>
            {/* 종료 시간 */}
            <div className="flex w-[100%] flex-col ">
              <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                <input
                  className="w-[100%] outline-none"
                  value={reservation.endTime}
                  readOnly
                />
              </div>
            </div>
            {/* 종료 시간 */}
          </div>

          <img
            className="h-[46px]"
            src="/assets/minus_time_btn.svg"
            alt="minusTimeBtn"
            onClick={() => handleRemoveReservationTime(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ReservationForm;
