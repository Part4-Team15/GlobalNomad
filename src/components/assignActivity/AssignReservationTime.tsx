import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssignData, Schedule } from '@/types/assignActivityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeAssignData from '@/hooks/useMergeAssignData';
import Toast from '@/utils/Toast';
import ReservationDate from './reservation/ReservationDate';
import ReservationStartTime from './reservation/ReservationStartTime';
import ReservationEndTime from './reservation/ReservationEndTime';
import ReservationForm from './reservation/ReservationForm';

const AssignReservationTime = () => {
  const { mergeSchedule, initialTimes } = useMergeAssignData();
  const data = useQuery({ queryKey: queryKeys.assignData() }).data as AssignData;
  const time: Schedule[] = data ? data.schedules : [];
  const { data: reservationDate } = useQuery({ queryKey: queryKeys.assignDate() });
  const { data: reservationStartTime } = useQuery({
    queryKey: queryKeys.assignStartTime(),
  });
  const { data: reservationEndTime } = useQuery({
    queryKey: queryKeys.assignEndTime(),
  });

  const handleAssignTime = () => {
    if (reservationDate && reservationStartTime && reservationEndTime) {
      const newReservationTime: Schedule = {
        date: reservationDate as string,
        startTime: reservationStartTime as string,
        endTime: reservationEndTime as string,
      };
      const isDuplicate = time.some(
        // 시간대 중복 로직
        (t: Schedule) =>
          t.date === newReservationTime.date &&
          t.startTime === newReservationTime.startTime &&
          t.endTime === newReservationTime.endTime,
      );
      if (isDuplicate) {
        Toast.error('동일한 날짜 및 시간대는 중복될 수 없습니다.');
        initialTimes();
        return;
      }
      mergeSchedule(newReservationTime);
      initialTimes();
    } else {
      Toast.error('날짜와 시간대는 필수 입력 사항입니다.');
    }
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">예약 가능한 시간대</span>
      <div className=" flex w-[100%] flex-col items-start gap-[21px]">
        <div className="flex w-[100%] items-start gap-5">
          {/* 날짜 */}
          <ReservationDate />
          {/* 날짜 */}

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            {/* 시작 시간 */}
            <ReservationStartTime />
            {/* 시작 시간 */}

            <span className=" mt-4">~</span>
            {/* 종료 시간 */}
            <ReservationEndTime />
            {/* 종료 시간 */}
          </div>

          <img
            className="mt-6 h-[46px]"
            src="/assets/plus_time_btn.svg"
            alt="plusTimeBtn"
            onClick={handleAssignTime}
          />
        </div>
        {/*  */}
        {data && data.schedules.length > 0 && <ReservationForm />}
      </div>
    </div>
  );
};

export default AssignReservationTime;
