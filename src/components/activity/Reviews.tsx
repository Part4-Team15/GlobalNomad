import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import getActivityReviews from '@/api/getActivityReviews';
import getFormatDate from '@/utils/getFormatDate';
import ratingToText from '@/utils/ratingToText';
import Pagination from '../mainpage/Pagination';

const OFFSET_LIMIT = 3;

const INITIAL_VALUE = {
  reviews: [],
  totalCount: 0,
  averageRating: 0,
};

const usePageReview = (id: number, pageNum: number, size: number) => {
  return useQuery({
    queryKey: ['pageActivity', id, pageNum, size],
    queryFn: () => getActivityReviews(id, pageNum, size),
    placeholderData: keepPreviousData,
  });
};

const Reviews = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPageNum, setCurrentPageNum] = useState(0);

  const { data = INITIAL_VALUE } = usePageReview(
    Number(id),
    currentPageNum + 1,
    OFFSET_LIMIT,
  );

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-xl font-bold pt-6">후기</h2>
      {data.totalCount ? (
        <div className="flex gap-4">
          <p className="text-5xl font-bold">{data.averageRating}</p>
          <div>
            <p className="text-base font-normal">{ratingToText(data.averageRating)}</p>
            <p className="flex gap-2 text-base font-normal">
              <img className="w-4" src="/assets/star_on_icon.svg" alt="rating star" />
              {data.totalCount}개 후기
            </p>
          </div>
        </div>
      ) : (
        <div>후기 없음</div>
      )}
      {/* 리뷰 List */}
      {data.totalCount > 0 ? (
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="w-full">
            {data.reviews?.map((review) => (
              <div key={review.id} className="flex flex-col gap-4">
                <div className="flex w-full gap-4">
                  {review.user.profileImageUrl ? (
                    <div
                      className="w-1/6 h-8 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${review.user.profileImageUrl})`,
                        backgroundColor: '#E3E5E8',
                      }}
                    />
                  ) : (
                    <div className="w-1/6 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white">
                      {review.user.nickname[0]}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <div className="font-bold">{review.user.nickname}</div>
                      <div>|</div>
                      <div className="text-gray-60">{getFormatDate(review.updatedAt)}</div>
                    </div>
                    <div>{review.content}</div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-40" />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPageNum}
            totalCount={data.totalCount}
            offsetLimit={OFFSET_LIMIT}
            setPageNum={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reviews;
