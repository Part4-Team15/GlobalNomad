import { Dispatch, SetStateAction } from 'react';

interface ScheduleTimeDropDownBoxProps {
  selectedSchedule: {
    scheduleId: number;
    startTime: string;
    endTime: string;
    count: {
      declined: number;
      confirmed: number;
      pending: number;
    };
  } | null;
  setVieScheduleTimeDropDown: Dispatch<SetStateAction<boolean>>;
}

const ScheduleTimeDropDownBox = ({
  selectedSchedule,
  setVieScheduleTimeDropDown,
}: ScheduleTimeDropDownBoxProps) => {
  const handleClickDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setVieScheduleTimeDropDown((prev) => !prev);
  };
  return (
    <div className="relative">
      <input
        type="text"
        value={`${selectedSchedule?.startTime} ~ ${selectedSchedule?.endTime}`}
        className="border border-gray-50 w-full rounded  pl-4 py-4 outline-none dark:bg-darkMode-black-30 dark:text-white"
      />
      <button type="button" className="cursor-pointer" onClick={handleClickDropDown}>
        <img
          src="/assets/chevron_down.svg"
          alt="drop_down_icon"
          className="absolute top-[18px] right-[10px]"
        />
      </button>
    </div>
  );
};

export default ScheduleTimeDropDownBox;
