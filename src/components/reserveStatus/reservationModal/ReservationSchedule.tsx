import getUpdateMyReservation from '@/api/getUpdateMyReservation';
import queryClient from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { forwardRef, useEffect } from 'react';
import { ReservationScheduleProps } from '@/types/reservationStatus';

const ReservationSchedule = forwardRef<HTMLDivElement, ReservationScheduleProps>(
  (
    {
      reservationStatus,
      nickname,
      headCount,
      activityId,
      reservationId,
      setSelelctedSchedule,
      inView,
      fetchNextPage,
    },
    ref,
  ) => {
    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    let reservationButton;

    const { mutate } = useMutation({
      mutationFn: getUpdateMyReservation,
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ['scheduleByStatus'] }),
          queryClient.invalidateQueries({ queryKey: ['reservationTimeTable'] }),
        ]),
    });

    const getConfirmReservation = () => {
      setSelelctedSchedule((prev) => {
        if (!prev) return null; // prev가 null인 경우 처리
        return {
          ...prev,
          count: {
            ...prev.count,
            confirmed: prev.count.confirmed + 1,
            declined: prev.count.pending - 1,
            pending: 0,
          },
        };
      });

      mutate({ activityId, reservationId, status: 'confirmed' });
    };

    const getDeclineReservation = () => {
      setSelelctedSchedule((prev) => {
        if (!prev) return null; // prev가 null인 경우 처리
        return {
          ...prev,
          count: {
            ...prev.count,
            declined: prev.count.declined + 1, // declined 수정
            pending: prev.count.pending - 1,
          },
        };
      });
      mutate({ activityId, reservationId, status: 'declined' });
    };

    switch (reservationStatus) {
      case 'pending':
        reservationButton = (
          <div className="flex gap-[6px] justify-end ">
            <button
              className="px-5 py-[10px] rounded-[6px] bg-[#112211] text-white font-bold"
              type="button"
              onClick={getConfirmReservation}
            >
              승인하기
            </button>
            <button
              className="px-5 py-[10px] rounded-[6px] bg-white text-[#112211] font-bold border border-[#112211]"
              type="button"
              onClick={getDeclineReservation}
            >
              거절하기
            </button>
          </div>
        );
        break;
      case 'confirmed':
        reservationButton = (
          <button
            type="button"
            className="px-[15px] py-[10px] bg-[#FFF4E8] font-bold rounded-[26.5px]"
          >
            <div className="text-[#FF7C1D]">예약 승인</div>
          </button>
        );
        break;
      case 'declined':
        reservationButton = (
          <button
            type="button"
            className="px-[15px] py-[10px] bg-[#FFE4E0] font-bold rounded-[26.5px]"
          >
            <div className="text-[#FF472E]">예약 거절</div>
          </button>
        );
        break;
      default:
        reservationButton = null;
    }

    return (
      <div className="pt-4 px-[16.43px] pb-3 pr-4 border border-[#DDD] h-[135px]  rounded dark:bg-darkMode-black-40">
        <div className="flex flex-col gap-[6px]">
          <div className="flex gap-[10px]">
            <div className="text-[#79747E] font-semibold dark:text-darkMode-white-30">닉네임</div>
            <div className="text-[#1B1B1B] font-medium dark:text-darkMode-white-10">{nickname}</div>
          </div>
          <div className="flex gap-[10px]">
            <div className="text-[#79747E] font-semibold dark:text-darkMode-white-30">인원</div>
            <div className="text-[#1B1B1B] font-medium dark:text-darkMode-white-10">
              {headCount}
            </div>
          </div>
        </div>
        <div className="mt-[6px] text-right">{reservationButton}</div>
        <div ref={ref} className="w-[10px] h-[10px]" />
      </div>
    );
  },
);

export default ReservationSchedule;
