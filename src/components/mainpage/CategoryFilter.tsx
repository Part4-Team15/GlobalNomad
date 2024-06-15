import { MouseEvent, useState } from 'react';
import FilterPopover from './FilterPopover';

const CATEGORY_LIST = ['문화 · 예술', '식음료', '스포츠', '투어', '웰빙'];

interface CategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (e: MouseEvent<HTMLButtonElement>) => void;
  onSetSort: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CategoryFilter = ({ currentCategory, onSelectCategory, onSetSort }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSortClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between text-green-80">
      <div className="relative">
        <div className="flex gap-6 hide-scrollbar overflow-x-scroll pr-14 md:gap-[14px] md:w-[522px] sm:gap-2 sm:w-60 sm:pr-8">
          {CATEGORY_LIST.map((category) => (
            <button
              className={`w-[127px] text-lg border border-green-80 rounded-2xl px-5 py-4 
              hover:bg-green-80 hover:text-white md:min-w-[120px] sm:min-w-20 sm:text-sm sm:px-2 sm:py-3
              ${category === currentCategory && 'bg-green-80 text-white'}`}
              type="button"
              key={category}
              value={category}
              onClick={onSelectCategory}
            >
              {category.trim()}
            </button>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-14 h-full md:bg-custom-tab-gradient sm:w-8 sm:bg-custom-mob-gradient" />
      </div>
      <div className="relative flex flex-col">
        <button
          className="flex justify-between items-center w-[127px] text-lg border border-green-80 rounded-2xl px-5 py-4 md:w-[120px] sm:w-[90px] sm:text-sm sm:py-3"
          onClick={handleFilterClick}
          type="button"
        >
          가격
          <img src="/assets/arrow_down.svg" alt="dropdown" />
        </button>
        <div onClick={handleSortClick}>
          <FilterPopover isOpen={isOpen} onSetSort={onSetSort} />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
