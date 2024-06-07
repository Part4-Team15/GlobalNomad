import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ModifyData, Schedule } from '@/types/modifyActivityPage';
import mergeModifyData from '../utils/mergeModifyData';

// 추가된 시간대 내역들 보여주는 컴포넌트
const ReservationForm = () => {
  const queryClient = useQueryClient();

  // 시간대 모아둠
  const { data: scheduleData } = useQuery<{ schedules: Schedule[] }>({
    queryKey: ['modifyData/Schedule'],
  });
  const time: Schedule[] = scheduleData ? scheduleData.schedules : [];

  const handleRemoveReservationTime = (index: number): void => {
    const updatedTimes = time.filter((_, i) => i !== index);
    queryClient.setQueryData(['modifyData/Schedule'], { schedules: updatedTimes });
    const removedSchedule = time[index];
    if (removedSchedule && removedSchedule.id !== undefined) {
      // id가 있는 경우는 이미 서버에서 받아온 데이터 즉 등록한 데이터를 의미한다.
      // 따라서 요청 보낼 쿼리에 id를 저장하기
      queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
        return mergeModifyData(oldData, {
          scheduleIdsToRemove: [
            ...(oldData?.scheduleIdsToRemove || []),
            removedSchedule.id as number,
          ],
        });
      });
    } else {
      // 그렇지 않는 경우에는 현재 저장해놨던 'schedulesToAdd'에 값을 삭제시키기
      queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
        const updatedSchedulesToAdd = oldData?.schedulesToAdd?.filter(
          (schedule) =>
            schedule.date !== removedSchedule.date ||
            schedule.startTime !== removedSchedule.startTime ||
            schedule.endTime !== removedSchedule.endTime,
        );
        return mergeModifyData(oldData, {
          schedulesToAdd: updatedSchedulesToAdd,
        });
      });
    }
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
              <input className="w-[100%] outline-none" value={reservation.date} readOnly />
            </div>
          </div>
          {/* 날짜 */}

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            {/* 시작 시간 */}
            <div className="flex w-[100%] flex-col ">
              <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                <input className="w-[100%] outline-none" value={reservation.startTime} readOnly />
              </div>
            </div>
            {/* 시작 시간 */}

            <span>~</span>
            {/* 종료 시간 */}
            <div className="flex w-[100%] flex-col ">
              <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                <input className="w-[100%] outline-none" value={reservation.endTime} readOnly />
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
