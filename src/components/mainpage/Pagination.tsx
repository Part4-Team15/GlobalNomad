import { MouseEvent, useState } from 'react';

interface PaginationProp {
  totalCount: number;
  offsetLimit: number;
  pageNumberLimit?: number;
  setActivityList: (pageNum: number, size: number) => void;
}

/**
 * @param totalCount 총 데이터의 개수.
 * @param offsetLimit 한 페이지 당 나타낼 데이터의 개수.
 * @param pageNumberLimit pageGroup 중 한 그룹당 들어갈 페이지 number의 개수. 기본값은 5.
 * @param setActivityList 현재 페이지에서 보여줄 데이터를 설정하는 함수.
 */

const Pagination = ({
  totalCount,
  offsetLimit,
  pageNumberLimit = 5,
  setActivityList
}: PaginationProp) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  // 총 페이지의 개수
  const totalPage = Math.ceil(totalCount / offsetLimit);

  // 총 페이지 수에 대한 배열 만들기
  const pageNumber = new Array(totalPage).fill(0).map((num, i) => num + i);

  // 페이지 그룹 리스트
  const pageGroup = [];

  for (let i = 0; i < pageNumber.length; i += pageNumberLimit) {
    pageGroup.push(pageNumber.slice(i, i + pageNumberLimit));
  }

  // 현재 선택한 페이지 수를 저장
  const handlePageBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(Number(button.id));
    setActivityList(Number(button.id), offsetLimit);
  };

  // 왼쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleLeftArrowBtnClick = () => {
    const isFirstPage = (currentPage % pageNumberLimit) === 0;

    if (currentPage === 0) return;
    if (isFirstPage) setCurrentPageGroup(currentPageGroup - 1);

    setCurrentPage(currentPage - 1);
    setActivityList(currentPage - 1, offsetLimit);
  };

  // 오른쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleRightArrowBtnClick = () => {
    const lastPageNumber = pageNumber.length - 1;
    const isLastPage = (currentPage % pageNumberLimit) === pageNumberLimit - 1;

    if (currentPage === lastPageNumber) return;
    if (isLastPage) setCurrentPageGroup(currentPageGroup + 1);

    setCurrentPage(currentPage + 1);
    setActivityList(currentPage + 1, offsetLimit);
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
      {pageGroup[currentPageGroup].map((pageNum) => (
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
