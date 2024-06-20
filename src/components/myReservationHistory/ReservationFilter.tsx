import { useState, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import ReservationDropdownFilterBox from './ReservationDropdownFilterBox';
import filterList from './filterList';

interface ReservationFilterProps {
  setStatus: (status: string) => void;
}

const ReservationFilter = ({ setStatus }: ReservationFilterProps) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('필터');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));

  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  const handleFilterClick = (statusKoreanName: string, statusName: string) => {
    setSelectedFilter(statusKoreanName);
    setStatus(statusName);
    setDropdownIsOpen(false);
  };

  return (
    <div
      onClick={toggleDropdown}
      ref={dropdownRef}
      className="flex relative justify-between px-5 py-4 border-green-80 rounded-[15px] w-40 text-green-80 font-medium text-[18px] border-[1.5px] md:hidden sm:hidden cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
    >
      {selectedFilter}
      <img src="/assets/arrow_down.svg" alt="arrow_down" />
      {dropdownIsOpen && (
        <ul className=" border-[1.5px] flex flex-col absolute top-[69.67px] rounded-[6px 6px 0px 0px] bg-white left-0 rounded-[6px] border-[#ddd] w-40 [&_li:not(:last-child)]:border-b-[1.5px] [&_li:not(:last-child)]:border-b-[#ddd] dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
          {filterList.map((item) => {
            return (
              <ReservationDropdownFilterBox
                key={item.id}
                statusKoreanName={item.statusKoreanName}
                statusName={item.statusName}
                setStatus={(statusName) => handleFilterClick(item.statusKoreanName, statusName)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReservationFilter;
