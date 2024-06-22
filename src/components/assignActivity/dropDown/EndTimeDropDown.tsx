import React from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';

interface EndTimeProps {
  onSelect: (endTime: string) => void;
}

const EndTimeDropDown = ({ onSelect }: EndTimeProps) => {
  const { data: startTime = '' } = useQuery<string>({
    queryKey: queryKeys.assignStartTime(),
  });

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

  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const startTimeDate = parseTime(startTime);

  const filteredTimes = reservationTime.filter(({ endTime }) => {
    const endTimeDate = parseTime(endTime);
    return endTimeDate > startTimeDate;
  });

  const handleSelectedTime = (endTime: string) => () => {
    onSelect(endTime);
  };

  return (
    <ul className=" absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[4px] shrink-0 rounded-md bg-white shadow-md dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
      {filteredTimes.map((time) => (
        <button
          key={time.endTime}
          type="button"
          className="w-[100%]  hover:bg-gray-30 dark:hover:bg-darkMode-gray-20"
          onClick={handleSelectedTime(time.endTime)}
        >
          <li className="flex text-base">{time.endTime}</li>
        </button>
      ))}
    </ul>
  );
};

export default EndTimeDropDown;
