import React, { useState } from 'react';
import StartTimeDropDown from './dropDown/StartTimeDropDown';
import EndTimeDropDown from './dropDown/EndTimeDropDown';

const AssignReservationTime = () => {
  const [isStartTimeDropDown, setIsStartTimeDropDown] = useState(false);
  const [isEndTimeDropDown, setIsEndTimeDropDown] = useState(false);
  const [time, setTime] = useState({ startTime: '', endTime: '' });

  const handleStartTimeDropDown = () => {
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  const handleEndTimeDropDown = () => {
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  const handleSelectStart = (startTime: string, endTime: string) => {
    setTime({ startTime, endTime });
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  const handleSelectEnd = (startTime: string, endTime: string) => {
    setTime({ startTime, endTime });
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">예약 가능한 시간대</span>
      <div className=" flex w-[100%] flex-col items-start gap-[21px]">
        <div className="flex w-[100%] items-start gap-5">
          <div className="flex w-[100%] flex-col">
            <span>날짜</span>
            <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
              <input className="w-[100%] outline-none" placeholder="YY/MM/DD" />

              <img src="/assets/calendar_icon.svg" alt="calendarIcon" />
            </div>
          </div>

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            <div className=" w-[100%] relative">
              <div className="flex w-[100%] flex-col ">
                <span>시작 시간</span>
                <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                  <input
                    className="w-[100%] outline-none"
                    placeholder="0:00"
                    value={time.startTime}
                    readOnly
                  />
                  <button type="button" onClick={handleStartTimeDropDown}>
                    <img
                      src={
                        isStartTimeDropDown
                          ? '/assets/arrow_up.svg'
                          : '/assets/arrow_down.svg'
                      }
                      alt="arrowIcon"
                    />
                  </button>
                </div>
              </div>
              {isStartTimeDropDown && (
                <StartTimeDropDown onSelect={handleSelectStart} />
              )}
            </div>

            <span className=" mt-4">~</span>

            <div className=" w-[100%] relative">
              <div className="flex w-[100%] flex-col ">
                <span>종료 시간</span>
                <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
                  <input
                    className="w-[100%] outline-none"
                    placeholder="0:00"
                    value={time.endTime}
                    readOnly
                  />
                  <button type="button" onClick={handleEndTimeDropDown}>
                    <img
                      src={
                        isEndTimeDropDown
                          ? '/assets/arrow_up.svg'
                          : '/assets/arrow_down.svg'
                      }
                      alt="arrowIcon"
                    />
                  </button>
                </div>
              </div>
              {isEndTimeDropDown && (
                <EndTimeDropDown onSelect={handleSelectEnd} />
              )}
            </div>
          </div>

          <img
            className="mt-6 h-[46px]"
            src="/assets/plus_time_btn.svg"
            alt="plusTimeBtn"
          />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default AssignReservationTime;
