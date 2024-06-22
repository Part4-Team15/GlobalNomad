import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Schedule } from '@/types/modifyActivityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import Toast from '@/utils/Toast';
import ReservationDate from './reservation/ReservationDate';
import ReservationStartTime from './reservation/ReservationStartTime';
import ReservationEndTime from './reservation/ReservationEndTime';
import ReservationForm from './reservation/ReservationForm';

interface ModifyReservationTimeProps {
  schedules: Schedule[];
}

const ModifyReservationTime = ({ schedules }: ModifyReservationTimeProps) => {
  const { mergeSchedule, mergeAddSchedule, mergeModifySchedule, initialTimes } =
    useMergeModifyData();

  // 새로운 쿼리 키로 데이터 추가
  useEffect(() => {
    mergeSchedule(schedules);
  }, []);

  // 스케줄 데이터 실시간으로 가져오기
  const { data: scheduleData } = useQuery<{ schedules: Schedule[] }>({
    queryKey: queryKeys.modifySchedule(),
  });
  const times = scheduleData ? scheduleData.schedules : [];

  // 추가하기 전 선택한 날짜, 시간대를 가져오기
  const { data: reservationDate } = useQuery({ queryKey: queryKeys.modifyScheduleDate() });
  const { data: reservationStartTime } = useQuery({
    queryKey: queryKeys.modifyScheduleStartTime(),
  });
  const { data: reservationEndTime } = useQuery({
    queryKey: queryKeys.modifyScheduleEndTime(),
  });

  // 시간대 추가함수
  const handleAssignTime = () => {
    if (reservationDate && reservationStartTime && reservationEndTime) {
      const newReservationTime: Schedule = {
        date: reservationDate as string,
        startTime: reservationStartTime as string,
        endTime: reservationEndTime as string,
      };
      const isDuplicate = times.some(
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
      // 쿼리에 데이터 추가
      mergeAddSchedule(newReservationTime);
      // 요청보낼 쿼리에도 데이터 추가
      mergeModifySchedule(newReservationTime);
      initialTimes();
    } else {
      Toast.error('날짜와 시간대는 필수 입력 사항입니다.');
    }
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold dark:text-darkMode-white-10">
        예약 가능한 시간대
      </span>
      <div className=" flex w-[100%] flex-col items-start gap-[21px]">
        <div className="flex w-[100%] items-start gap-5">
          <ReservationDate />

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            <ReservationStartTime />

            <span className=" mt-4 dark:text-darkMode-gray-10">~</span>

            <ReservationEndTime />
          </div>

          <img
            className="mt-6 h-[46px] cursor-pointer"
            src="/assets/plus_time_btn.svg"
            alt="plusTimeBtn"
            onClick={handleAssignTime}
          />
        </div>
        {scheduleData && scheduleData.schedules && scheduleData.schedules.length > 0 && (
          <ReservationForm />
        )}
      </div>
    </div>
  );
};

export default ModifyReservationTime;
