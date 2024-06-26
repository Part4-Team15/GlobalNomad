import { MouseEvent } from 'react';

const POPOVER_VALUES = [
  { buttonName: '가격 낮은 순', sortKey: 'price_asc' },
  { buttonName: '가격 높은 순', sortKey: 'price_desc' }
];

interface FilterPopoverProp {
  isOpen: boolean;
  onSetSort: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FilterPopover = ({ isOpen, onSetSort }: FilterPopoverProp) => {
  return (
    <div
      className="absolute top-[66px] flex flex-col text-green-80 dark:text-darkMode-white-10"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <button
        className="w-[127px] bg-white border border-gray-30 rounded-t-xl text-lg font-medium py-[18px]
        hover:bg-green-10 dark:bg-darkMode-black-40 dark:border-darkMode-gray-10 dark:hover:bg-darkMode-gray-10
        md:w-[120px] sm:w-[90px] sm:text-sm"
        type="button"
        value={POPOVER_VALUES[0].sortKey}
        onClick={onSetSort}
      >
        {POPOVER_VALUES[0].buttonName}
      </button>
      <button
        className="w-[127px] bg-white border border-gray-30 rounded-b-xl text-lg font-medium py-[18px]
        hover:bg-green-10 dark:bg-darkMode-black-40 dark:border-darkMode-gray-10 dark:hover:bg-darkMode-gray-10
        md:w-[120px] sm:w-[90px] sm:text-sm"
        type="button"
        value={POPOVER_VALUES[1].sortKey}
        onClick={onSetSort}
      >
        {POPOVER_VALUES[1].buttonName}
      </button>
    </div>
  );
};

export default FilterPopover;
