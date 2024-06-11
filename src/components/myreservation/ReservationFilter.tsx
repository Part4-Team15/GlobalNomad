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
      className="relative flex justify-between border px-5 py-4 border-green-80 rounded-[15px] w-40 text-green-80"
    >
      필터
      <img src="/assets/arrow_down.svg" alt="arrow_down" />
      {showDropdown && (
        <div className=" border flex flex-col absolute top-[70px] rounded-[6px 6px 0px 0px] bg-white left-0 rounded-[6px] border-[#ddd]">
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
        </div>
      )}
    </button>
  );
};

export default ReservationFilter;
