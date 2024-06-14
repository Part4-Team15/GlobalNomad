import React, { useState, KeyboardEvent, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

interface Option {
  label: string;
  onClick: () => void;
}
interface IProps {
  options: Option[];
}
const CustomKebabMenu = ({ options }: IProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 토글
  const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen);
  // 옵션 선택시
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    option.onClick();
    setDropdownIsOpen(false);
  };
  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') toggleDropdown();
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 선택 영역 */}
      <div
        className="sm:w-8 sm:h-8"
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <img src="/assets/kebab_icon.svg" alt="kebabIcon" />
      </div>
      {/* 옵션 리스트 */}
      {dropdownIsOpen && (
        <ul className=" text-gray-80 text-[1.125rem] shadow-md absolute top-[calc(100%+0.5rem)] right-0 w-40 rounded border border-gray-30 bg-white z-50 list-none">
          {options.map((option) => (
            <li
              key={`${option.label}`}
              data-selected={option === selectedOption}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleOptionClick(option);
                }
              }}
              tabIndex={0}
              role="option"
              aria-selected={option === selectedOption}
              className={`py-4 flex items-center justify-center cursor-pointer ${
                option !== options[options.length - 1] ? 'border-b border-gray-300' : ''
              } hover:bg-gray-100`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomKebabMenu;
