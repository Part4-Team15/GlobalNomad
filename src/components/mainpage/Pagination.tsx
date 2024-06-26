import { MouseEvent } from 'react';
import { ReactComponent as LeftArrow } from './assets/bold_arrow_left.svg';
import { ReactComponent as RightArrow } from './assets/bold_arrow_right.svg';

interface PaginationProp {
  currentPage: number;
  currentPageGroup: number;
  totalCount: number;
  offsetLimit: number;
  pageNumberLimit?: number;
  setPageNum: (pageNum: number) => void;
}

/**
 * @param currentPage 현재 페이지 number
 * @param currentPageGroup 현재 페이지 group
 * @param totalCount 총 데이터의 개수.
 * @param offsetLimit 한 페이지 당 나타낼 데이터의 개수.
 * @param pageNumberLimit pageGroup 중 한 그룹당 들어갈 페이지 number의 개수. 기본값은 5.
 * @param setPageNum 현재 페이지 number를 바꾸는 setter 함수
 * @param setPageGroup 현재 페이지 group을 바꾸는 setter 함수
 */

const Pagination = ({
  currentPage,
  currentPageGroup = 0,
  totalCount,
  offsetLimit,
  pageNumberLimit = 5,
  setPageNum,
}: PaginationProp) => {
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
    setPageNum(Number(button.id));
  };

  // 왼쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleLeftArrowBtnClick = () => {

    if (currentPage === 0) return;

    setPageNum(currentPage - 1);
  };

  // 오른쪽 arrow 버튼으로 이동 시 실행할 함수
  const handleRightArrowBtnClick = () => {
    const lastPageNumber = pageNumber.length - 1;

    if (currentPage === lastPageNumber) return;

    setPageNum(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-[10px]">
      <button
        className={`flex justify-center items-center w-[55px] h-[55px] bg-white rounded-2xl dark:bg-darkMode-black-40 sm:w-10 sm:h-10
        ${currentPage === 0 ? 'border border-gray-30 dark:border-darkMode-gray-20' : 'border border-green-80 dark:border-darkMode-gray-10'}`}
        onClick={handleLeftArrowBtnClick}
        type="button"
        disabled={currentPage === 0}
        aria-label="Go to previous page"
      >
        <LeftArrow className={currentPage === 0 ? 'fill-gray-60 dark:fill-darkMode-gray-20' : 'fill-green-80 dark:fill-darkMode-white-10'} />
      </button>
      {pageGroup[currentPageGroup] && pageGroup[currentPageGroup].map((pageNum) => (
        <button
          className={`w-[55px] h-[55px] text-lg border border-green-80 rounded-2xl hover:bg-green-80 hover:text-white
            dark:border-darkMode-gray-10 dark:text-darkMode-white-10 dark:hover:bg-darkMode-gray-10 sm:w-10 sm:h-10
          ${currentPage === pageNum ? 'bg-green-80 text-white dark:bg-darkMode-gray-10' : 'bg-white text-green-80 dark:bg-darkMode-black-40'}`}
          onClick={handlePageBtnClick}
          type="button"
          id={pageNum}
          key={pageNum}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        className={`flex justify-center items-center w-[55px] h-[55px] bg-white rounded-2xl dark:bg-darkMode-black-40 sm:w-10 sm:h-10
          ${currentPage === pageNumber[pageNumber.length - 1] ? 'border border-gray-30 dark:border-darkMode-gray-20' : 'border border-green-80 dark:border-darkMode-gray-10'}`}
        onClick={handleRightArrowBtnClick}
        type="button"
        disabled={currentPage === pageNumber[pageNumber.length - 1]}
        aria-label="Go to next page"
      >
        <RightArrow className={currentPage === pageNumber[pageNumber.length - 1] ? 'fill-gray-60 dark:fill-darkMode-gray-20' : 'fill-green-80 dark:fill-darkMode-white-10'} />
      </button>
    </div>
  );
};

export default Pagination;
