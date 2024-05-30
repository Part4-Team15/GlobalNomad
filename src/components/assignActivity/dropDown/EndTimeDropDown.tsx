import React from 'react';

interface EndTimeProps {
  onSelect: (endTime: string) => void;
}

const EndTimeDropDown = ({ onSelect }: EndTimeProps) => {
  const reservationTime = [
    { endTime: '10:00' },
    { endTime: '11:00' },
    { endTime: '12:00' },
    { endTime: '13:00' },
    { endTime: '14:00' },
    { endTime: '15:00' },
    { endTime: '16:00' },
    { endTime: '17:00' },
  ];

  const handleSelectedTime = (endTime: string) => () => {
    onSelect(endTime);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[4px] shrink-0 rounded-md bg-white shadow-md">
      {reservationTime.map((time) => (
        <button
          key={time.endTime}
          type="button"
          className="w-[100%]  hover:bg-gray-30 "
          onClick={handleSelectedTime(time.endTime)}
        >
          <li className="flex text-base">{time.endTime}</li>
        </button>
      ))}
    </ul>
  );
};

export default EndTimeDropDown;
