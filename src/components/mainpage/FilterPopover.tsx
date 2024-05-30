const POPOVER_VALUES = ['가격 낮은 순', '가격 높은 순'];
interface FilterPopoverProp {
  isOpen: boolean;
}

const FilterPopover = ({ isOpen }: FilterPopoverProp) => (
  <div
    style={{ display: isOpen ? 'block' : 'none' }}
    className="absolute top-[66px] flex flex-col text-green-80"
  >
    <button
      className="w-[127px] bg-white border border-gray-30 rounded-t-xl py-4 hover:bg-green-10"
      type="button"
    >
      {POPOVER_VALUES[0]}
    </button>
    <button
      className="w-[127px] bg-white border border-gray-30 rounded-b-xl py-4 hover:bg-green-10"
      type="button"
    >
      {POPOVER_VALUES[1]}
    </button>
  </div>
);

export default FilterPopover;
