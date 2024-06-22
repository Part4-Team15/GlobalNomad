import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { REVIEW_OFFSET_LIMIT } from '@/constants/pagination_config';
import calculatePageGroupNumber from '@/utils/calculatePageGroupNumber';
import getActivityReviews from '@/api/getActivityReviews';
import queryKeys from '@/api/reactQuery/queryKeys';
import getFormatDate from '@/utils/getFormatDate';
import ratingToText from '@/utils/ratingToText';
import Pagination from '../mainpage/Pagination';

const usePageReview = (id: number, pageNum: number, size: number) => {
  return useQuery({
    queryKey: queryKeys.reviews(id, pageNum, size),
    queryFn: () => getActivityReviews(id, pageNum, size),
    placeholderData: keepPreviousData,
  });
};

const Reviews = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const currentPageGroup = calculatePageGroupNumber(currentPageNum);

  const {
    data: reviewData,
    isLoading,
    isError,
  } = usePageReview(Number(id), currentPageNum + 1, REVIEW_OFFSET_LIMIT);

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  if (isLoading) {
    return <div>후기를 불러오고 있습니다</div>;
  }

  if (isError || !reviewData) {
    return <div>후기 정보를 불러오는 중 오류가 발생했습니다</div>;
  }

  const { reviews, averageRating, totalCount } = reviewData;

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-xl font-bold pt-6 dark:text-darkMode-white-10">후기</h2>
      {totalCount ? (
        <div className="flex gap-4">
          <data value={averageRating} className="text-5xl font-bold dark:text-darkMode-white-20">
            {averageRating}
          </data>
          <div>
            <p className="text-base font-normal dark:text-darkMode-white-20">
              {ratingToText(averageRating)}
            </p>
            <p className="flex gap-2 text-base font-normal dark:text-darkMode-white-20">
              <img className="w-4" src="/assets/star_on_icon.svg" alt="rating star" />
              {totalCount}개 후기
            </p>
          </div>
        </div>
      ) : (
        <div className="dark:text-darkMode-white-20">후기 없음</div>
      )}
      {/* 리뷰 List */}
      {totalCount > 0 ? (
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="w-full">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-4">
                <div className="flex w-full gap-4">
                  {review.user.profileImageUrl ? (
                    <div
                      className="w-12 h-12 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${review.user.profileImageUrl})`,
                        backgroundColor: '#E3E5E8',
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-white">
                      {review.user.nickname[0]}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <div className="font-bold dark:text-darkMode-white-20">
                        {review.user.nickname}
                      </div>
                      <div className="dark:text-darkMode-gray-10">|</div>
                      <div className="text-gray-60">{getFormatDate(review.updatedAt)}</div>
                    </div>
                    <p className="dark:text-darkMode-white-20">{review.content}</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-40" />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPageNum}
            currentPageGroup={currentPageGroup}
            totalCount={totalCount}
            offsetLimit={REVIEW_OFFSET_LIMIT}
            setPageNum={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reviews;
