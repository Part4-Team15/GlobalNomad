import React from 'react';

interface StartTimeProps {
  onSelect: (startTime: string, endTime: string) => void;
}

const StartTimeDropDown = ({ onSelect }: StartTimeProps) => {
  const reservationTime = [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '13:00' },
    { startTime: '13:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '17:00' },
  ];

  const handleSelectedTime = (startTime: string, endTime: string) => () => {
    onSelect(startTime, endTime);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[4px] shrink-0 rounded-md bg-white shadow-md">
      {reservationTime.map((time) => (
        <button
          key={time.startTime}
          type="button"
          className="w-[100%]  hover:bg-gray-30 "
          onClick={handleSelectedTime(time.startTime, time.endTime)}
        >
          <li className="flex text-base">
            {time.startTime} ~ {time.endTime}
          </li>
        </button>
      ))}
    </ul>
  );
};

export default StartTimeDropDown;
