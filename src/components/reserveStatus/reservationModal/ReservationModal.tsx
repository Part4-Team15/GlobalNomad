import getReservationSchedule from '@/api/getReservationSchedule';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import getScheduleBoardByStatus from '@/api/getScheduleBoardByStatus';
import { useInView } from 'react-intersection-observer';
import { ReservationsResponse, Schedule, ReservationModalProps } from '@/types/reservationStatus';
import ScheduleTimeDropDownBox from './ScheduleTimeDropDownBox';
import ScheduleTimeDropDown from './ScheduleTimeDropDown';
import ReservationSchedule from './ReservationSchedule';
import '../../../styles/customScrollbar.css';

const ReservationModal = ({
  setViewReservationModal,
  selectedDate,
  activitiyId,
  viewReservationModal,
}: ReservationModalProps) => {
  const [selectedSchedule, setSelelctedSchedule] = useState<Schedule | null>(null);
  const [reservationStatus, setReservationStatus] = useState<string>('pending');
  const [viewScheduleTimeDropDown, setVieScheduleTimeDropDown] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCloseModal = () => {
    setViewReservationModal(false);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        viewReservationModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setViewReservationModal(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [viewReservationModal, setViewReservationModal]);

  const { data: scheduleByStatus, fetchNextPage } = useInfiniteQuery<ReservationsResponse>({
    queryKey: ['scheduleByStatus', activitiyId, selectedSchedule?.scheduleId, reservationStatus],
    queryFn: getScheduleBoardByStatus,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
  const dateParams = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
  const { data: scheduleData } = useQuery<Schedule[]>({
    queryKey: ['schedule', activitiyId, dateParams],
    queryFn: getReservationSchedule,
  });

  const reservation = scheduleByStatus?.pages.flatMap((page) => page.reservations);

  console.log(reservation);
  useEffect(() => {
    if (scheduleData) {
      const firstSchedule = scheduleData[0];
      setSelelctedSchedule(firstSchedule);
    }
  }, [scheduleData]);

  const { inView, ref } = useInView();
  return (
    <div
      className="border border-[#ddd] absolute top-[200px] right-[190px] w-[429px] h-[697px] bg-white rounded-3xl shadow-[0px_4px_16px_0px_rgba(17, 34, 17, 0.05)] px-[24px] pt-[31px] z-[10] sm:w-screen sm:top-0 sm:right-0 sm:fixed sm:inset-0 sm:h-screen sm:rounded-none dark:bg-darkMode-black-20"
      ref={modalRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="429"
        height="2"
        viewBox="0 0 429 2"
        fill="none"
        className="relative top-[122px] left-[-24px] -z-10"
      >
        <path d="M1 1L428 1.00004" stroke="#DDDDDD" strokeLinecap="square" />
      </svg>
      <div className="flex justify-between">
        <div className="font-bold text-[28px] text-[#1b1b1b] dark:text-white">예약정보</div>
        <button type="button" onClick={handleCloseModal}>
          <img src="/assets/x_btn.svg" alt="cancel_icon" />
        </button>
      </div>
      <div className="flex gap-3 mt-[34px] text-[20px] text-[#4b4b4b] dark:text-darkMode-white-20">
        <div className="flex flex-col gap-[13px]">
          <button
            type="button"
            className={reservationStatus === 'pending' ? 'font-bold' : ''}
            onClick={() => setReservationStatus('pending')}
          >
            신청 {selectedSchedule?.count?.pending}
          </button>
          {reservationStatus === 'pending' ? (
            <div className="w-full h-1 rounded-xl bg-black" />
          ) : null}
        </div>
        <div className="flex flex-col gap-[13px]">
          <button
            type="button"
            className={reservationStatus === 'confirmed' ? 'font-bold' : ''}
            onClick={() => setReservationStatus('confirmed')}
          >
            승인 {selectedSchedule?.count?.confirmed}
          </button>
          {reservationStatus === 'confirmed' ? (
            <div className="w-full h-1 rounded-xl bg-black" />
          ) : null}
        </div>

        <div className="flex flex-col gap-[13px]">
          <button
            type="button"
            className={reservationStatus === 'declined' ? 'font-bold' : ''}
            onClick={() => setReservationStatus('declined')}
          >
            거절 {selectedSchedule?.count?.declined}
          </button>
          {reservationStatus === 'declined' ? (
            <div className="w-full h-1 rounded-xl bg-black" />
          ) : null}
        </div>
      </div>
      <div className="mt-[25px] text-[#1b1b1b] font-semibold text-[20px] dark:text-white">
        예약날짜
      </div>
      <div className="mt-[14px] text-[#1b1b1b]  text-[20px] mb-[10px] dark:text-white">{`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일`}</div>

      {selectedSchedule ? (
        <>
          <ScheduleTimeDropDownBox
            selectedSchedule={selectedSchedule}
            setVieScheduleTimeDropDown={setVieScheduleTimeDropDown}
          />
          {viewScheduleTimeDropDown && (
            <div className="relative">
              <ScheduleTimeDropDown
                schedule={scheduleData || []}
                setSelelctedSchedule={setSelelctedSchedule}
                viewScheduleTimeDropDown={viewScheduleTimeDropDown}
                setVieScheduleTimeDropDown={setVieScheduleTimeDropDown}
              />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4">
            <div className="text-[#1b1b1b] font-semibold text-[20px] dark:text-white">
              예약 내역
            </div>
            <div className="flex flex-col gap-[14px] h-[186px] overflow-y-auto custom-scrollbar">
              {reservation?.map((item) => {
                return (
                  <ReservationSchedule
                    reservationStatus={reservationStatus}
                    key={item.id}
                    nickname={item.nickname}
                    headCount={item.headCount}
                    activityId={activitiyId}
                    reservationId={item.id}
                    setSelelctedSchedule={setSelelctedSchedule}
                    fetchNextPage={fetchNextPage}
                    ref={ref}
                    inView={inView}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div>일정이 없습니다</div>
      )}
    </div>
  );
};

export default ReservationModal;
