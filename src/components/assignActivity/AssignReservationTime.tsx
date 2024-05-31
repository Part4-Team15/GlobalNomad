import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AssignData, ReservationTime } from '@/types/assignActivityPage';
import mergeAssignData from './utils/mergeAssignData';
import ReservationDate from './reservation/ReservationDate';
import ReservationStartTime from './reservation/ReservationStartTime';
import ReservationEndTime from './reservation/ReservationEndTime';
import ReservationForm from './reservation/ReservationForm';

const AssignReservationTime = () => {
  const queryClient = useQueryClient();
  const data = useQuery({ queryKey: ['assignData'] }).data as AssignData;
  const time: ReservationTime[] = data ? data.reservationTime : [];
  const { data: reservationDate } = useQuery({ queryKey: ['assign/Date'] });
  const { data: reservationStartTime } = useQuery({
    queryKey: ['assign/StartTime'],
  });
  const { data: reservationEndTime } = useQuery({
    queryKey: ['assign/EndTime'],
  });

  const handleAssignTime = () => {
    if (reservationDate && reservationStartTime && reservationEndTime) {
      const newReservationTime: ReservationTime = {
        reservationDate: reservationDate as string,
        startTime: reservationStartTime as string,
        endTime: reservationEndTime as string,
      };
      const isDuplicate = time.some(
        // 시간대 중복 로직
        (t: ReservationTime) =>
          t.reservationDate === newReservationTime.reservationDate &&
          t.startTime === newReservationTime.startTime &&
          t.endTime === newReservationTime.endTime,
      );
      if (isDuplicate) {
        alert('동일한 날짜 및 시간대는 중복될 수 없습니다.');
        return;
      }
      queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
        return mergeAssignData(oldData, {
          reservationTime: [
            ...(oldData?.reservationTime || []),
            newReservationTime,
          ],
        });
      });
    } else {
      alert('날짜와 시간대는 필수입니다.');
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
        {data && data.reservationTime.length > 0 && <ReservationForm />}
      </div>
    </div>
  );
};

export default AssignReservationTime;
