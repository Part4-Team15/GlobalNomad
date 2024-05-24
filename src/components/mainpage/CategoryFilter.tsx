const CATEGORY_LIST = ['문화 · 예술', '식음료', '스포츠', '투어', '웰빙'];

const CategoryFilter = () => (
  <div className="flex justify-between w-[75rem] my-16">
    <div className="flex gap-6">
      {CATEGORY_LIST.map((category) => (
        <button
          className="border border-green-80 rounded-2xl px-8 py-4 hover:bg-green-80 hover:text-white"
          type="button"
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
    <button
      className="flex justify-between items-center w-[127px] border border-green-80 rounded-2xl px-5 py-4"
      type="button"
    >
      가격
      <img src="/assets/arrow_down.svg" alt="dropdown" />
    </button>
  </div>
);

export default CategoryFilter;
