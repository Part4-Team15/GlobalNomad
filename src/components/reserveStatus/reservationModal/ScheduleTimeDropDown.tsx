import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

interface ScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

interface ScheduleTimeDropDownProps {
  schedule: ScheduleType[];
  setSelelctedSchedule: React.Dispatch<React.SetStateAction<ScheduleType | null>>;
  viewScheduleTimeDropDown: boolean;
  setVieScheduleTimeDropDown: Dispatch<SetStateAction<boolean>>;
}

const ScheduleTimeDropDown = ({
  schedule,
  setSelelctedSchedule,
  viewScheduleTimeDropDown,
  setVieScheduleTimeDropDown,
}: ScheduleTimeDropDownProps) => {
  const onClickScheduleTime = (selectedSchedule: ScheduleType) => {
    setVieScheduleTimeDropDown(false);
    setSelelctedSchedule(selectedSchedule);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (viewScheduleTimeDropDown && !dropdownRef.current?.contains(e.target)) {
        setVieScheduleTimeDropDown(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [viewScheduleTimeDropDown]);

  return (
    <div
      ref={dropdownRef}
      className="w-full border border-gray-50 h-[170px] absolute z-50 bg-white rounded overflow-y-auto"
    >
      <ul>
        {schedule.map((item) => {
          return (
            <li
              className="px-4 py-4 cursor-pointer hover:bg-slate-400"
              onClick={() => onClickScheduleTime(item)}
            >
              {`${item.startTime} ~ ${item.endTime}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScheduleTimeDropDown;
