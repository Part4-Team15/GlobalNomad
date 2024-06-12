import { useState } from 'react';
import ReservationDropdownFilterBox from './ReservationDropdownFilterBox';
import filterList from './filterList';

interface ReservationFilterProps {
  setStatus: (status: string) => void;
}

const ReservationFilter = ({ setStatus }: ReservationFilterProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <button
      onClick={handleDropdownClick}
      type="button"
      className="flex relative justify-between px-5 py-4 border-green-80 rounded-[15px] w-40 text-green-80 font-medium text-[18px] border-[1.5px]"
    >
      필터
      <img src="/assets/arrow_down.svg" alt="arrow_down" />
      {showDropdown && (
        <ul className=" border-[1.5px] flex flex-col absolute top-[69.67px] rounded-[6px 6px 0px 0px] bg-white left-0 rounded-[6px] border-[#ddd] w-40 [&_li:not(:last-child)]:border-b-[1.5px] [&_li:not(:last-child)]:border-b-[#ddd]">
          {filterList.map((item) => {
            return (
              <ReservationDropdownFilterBox
                key={item.id}
                statusKoreanName={item.statusKoreanName}
                statusName={item.statusName}
                setStatus={setStatus}
              />
            );
          })}
        </ul>
      )}
    </button>
  );
};

export default ReservationFilter;
