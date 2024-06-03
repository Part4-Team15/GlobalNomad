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

  return (
    <div className="flex justify-between text-green-80">
      <div className="flex gap-6">
        {CATEGORY_LIST.map((category) => (
          <button
            className={`w-[127px] text-lg border border-green-80 rounded-2xl px-5 py-4 hover:bg-green-80 hover:text-white ${category === currentCategory && 'bg-green-80 text-white'}`}
            type="button"
            key={category}
            value={category}
            onClick={onSelectCategory}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="relative flex flex-col">
        <button
          className="flex justify-between items-center w-[127px] text-lg border border-green-80 rounded-2xl px-5 py-4"
          onClick={handleFilterClick}
          type="button"
        >
          가격
          <img src="/assets/arrow_down.svg" alt="dropdown" />
        </button>
        <FilterPopover isOpen={isOpen} onSetSort={onSetSort} />
      </div>
    </div>
  );
};

export default CategoryFilter;
