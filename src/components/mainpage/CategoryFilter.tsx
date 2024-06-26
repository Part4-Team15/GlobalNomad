import { MouseEvent, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import FilterPopover from './FilterPopover';
import { ReactComponent as PopoverArrow } from './assets/arrow_down.svg';

const CATEGORY_LIST = ['문화 · 예술', '식음료', '스포츠', '투어', '웰빙'];

interface CategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (e: MouseEvent<HTMLButtonElement>) => void;
  onSetSort: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CategoryFilter = ({ currentCategory, onSelectCategory, onSetSort }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSortClick = () => {
    setIsOpen(false);
  };

  useClickOutside(popoverRef, handleSortClick);

  return (
    <div className="flex justify-between text-green-80 dark:text-darkMode-white-10">
      <div className="relative">
        <div className="flex gap-6 hide-scrollbar overflow-x-scroll pr-14 md:gap-[14px] md:w-[522px] sm:gap-2 sm:w-60 sm:pr-8">
          {CATEGORY_LIST.map((category) => (
            <button
              className={`w-[127px] text-lg border border-green-80 rounded-2xl px-5 py-4 
              hover:bg-green-80 hover:text-white dark:bg-darkMode-black-40 dark:border-darkMode-gray-10 dark:hover:bg-darkMode-gray-10
              md:min-w-[120px] sm:min-w-20 sm:text-sm sm:px-2 sm:py-3
              ${category === currentCategory ? 'bg-green-80 text-white' : 'bg-white'}`}
              type="button"
              key={category}
              value={category}
              onClick={onSelectCategory}
            >
              {category.trim()}
            </button>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-14 h-full dark:md:bg-darkMode-tab-gradient dark:sm:bg-darkMode-mob-gradient
          md:bg-custom-tab-gradient sm:w-8 sm:bg-custom-mob-gradient" />
      </div>
      <div className="relative flex flex-col">
        <button
          className="flex justify-between items-center w-[127px] h-[62px] text-lg bg-white border border-green-80 rounded-2xl px-5 py-4
          dark:bg-darkMode-black-40 dark:border-darkMode-gray-10 md:w-[120px] sm:w-[90px] sm:h-[46px] sm:text-sm sm:px-3 sm:py-3"
          onClick={handleFilterClick}
          type="button"
        >
          <p>가격</p>
          <PopoverArrow className="fill-green-80 dark:fill-darkMode-gray-10"/>
        </button>
        <div onClick={handleSortClick} ref={popoverRef}>
          <FilterPopover isOpen={isOpen} onSetSort={onSetSort} />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
