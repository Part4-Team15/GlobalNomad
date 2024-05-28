import { MouseEvent, useState } from 'react';

interface PaginationProp {
  totalCount: number;
}

/**
 *
 * @param {number} totalCount 총 페이지의 개수. 데이터 패칭 도입 이후 넘겨받는 값이 달라질 수 있음.
 */

const Pagination = ({ totalCount }: PaginationProp) => {
  const [currentPage, setCurrentPage] = useState(0);

  // 넘겨받은 총 페이지 수에 대한 배열 만들기
  const pageNumber = new Array(totalCount).fill(0).map((num, i) => num + i);

  // 현재 선택한 페이지 수를 저장
  const handlePageBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(+button.id);
  };

  // 왼쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleLeftArrowBtnClick = () => {
    if (currentPage === pageNumber[0]) return;
    setCurrentPage(currentPage - 1);
  };

  // 오른쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleRightArrowBtnClick = () => {
    if (currentPage === pageNumber[pageNumber.length - 1]) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex gap-[10px]">
      <button
        className="flex justify-center items-center w-[55px] h-[55px] border border-green-80 rounded-2xl"
        onClick={handleLeftArrowBtnClick}
        type="button"
      >
        <img className="rotate-180" src="/assets/bold_arrow_right.svg" alt="arrow-left" />
      </button>
      {pageNumber.map((pageNum) => (
        <button
          className={`w-[55px] h-[55px] text-lg border border-green-80 rounded-2xl hover:bg-green-80 hover:text-white ${currentPage === pageNum ? 'bg-green-80 text-white' : 'bg-white text-green-80'}`}
          onClick={handlePageBtnClick}
          type="button"
          id={pageNum}
          key={pageNum}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        className="flex justify-center items-center w-[55px] h-[55px] border border-green-80 rounded-2xl"
        onClick={handleRightArrowBtnClick}
        type="button"
      >
        <img src="/assets/bold_arrow_right.svg" alt="arrow-right" />
      </button>
    </div>
  );
};

export default Pagination;
