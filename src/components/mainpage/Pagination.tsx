import React from 'react';

interface PaginationProp {
  count: number;
}

const Pagination = ({ count }: PaginationProp) => {
  const pageNumber = new Array(count).fill(0).map((num, i) => num + i);
  console.log(pageNumber);

  return (
    <div className="flex gap-[10px]">
      <button className="flex justify-center items-center w-[55px] h-[55px] border border-green-80 rounded-2xl" type="button">
        <img src="/assets/bold_arrow_left.svg" alt="arrow-left" />
      </button>
      {pageNumber.map((pageNum) => (
        <button
          className="w-[55px] h-[55px] text-lg text-green-80 bg-white border border-green-80 rounded-2xl hover:bg-green-80 hover:text-white"
          type="button"
          key={pageNum}
        >
          {pageNum + 1}
        </button>
      ))}
      <button className="flex justify-center items-center w-[55px] h-[55px] border border-green-80 rounded-2xl" type="button">
        <img src="/assets/bold_arrow_right.svg" alt="arrow-right" />
      </button>
    </div>
  );
};

export default Pagination;
