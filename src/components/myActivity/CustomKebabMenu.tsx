import React, { useState, KeyboardEvent } from 'react';

interface Option {
  label: string;
  onClick: () => void;
}
interface IProps {
  options: Option[];
}
const CustomKebabMenu = ({ options }: IProps) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림
  const [selectedOption, setSelectedOption] = useState<Option>();
  // 드롭다운 토글
  const toggleDropdown = () => setIsOpen(!isOpen);
  // 옵션 선택시
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    option.onClick();
    setIsOpen(false);
  };
  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') toggleDropdown();
  };

  return (
    <div className="relative">
      {/* 드롭다운 선택 영역 */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <img src="/assets/kebab_icon.svg" alt="kebabIcon" />
      </div>
      {/* 옵션 리스트 */}
      {isOpen && (
        <ul className="shadow-md absolute top-[calc(100%+0.5rem)] right-0 w-40 rounded border border-gray-30 bg-white z-50 list-none">
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
                option !== options[options.length - 1]
                  ? 'border-b border-gray-300'
                  : ''
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
