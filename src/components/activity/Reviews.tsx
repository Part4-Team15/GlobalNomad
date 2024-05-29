import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getActivityReviews from '@/api/getActivityReviews';
import { ActivityReviewsType } from '@/types/activityPage';
import getFormatDate from '@/utils/getFormatDate';

const Reviews = () => {
  const { id } = useParams<{ id: string }>();

  const [reviewData, setReviewData] = useState<ActivityReviewsType>({
    reviews: [
      {
        id: 0,
        user: {
          id: 0,
          nickname: '',
          profileImageUrl: '',
        },
        activityId: 0,
        content: '',
        rating: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
    totalCount: 0,
    averageRating: 0,
  });

  const ratingToText = (averageRating: number) => {
    if (averageRating >= 4) {
      return '매우 만족';
    }
    if (averageRating >= 3.5 && averageRating < 4) {
      return '만족';
    }
    if (averageRating >= 3 && averageRating < 3.5) {
      return '보통';
    }
    if (averageRating >= 2.5 && averageRating < 3) {
      return '불만족';
    }
    if (averageRating < 2.5) {
      return '매우 불만족';
    }
    return null;
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const getReviews = async () => {
      try {
        const reviewsData = await getActivityReviews(id);
        setReviewData(reviewsData);
      } catch (error) {
        console.error('Reviews 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
    getReviews();
  }, []);

  const { averageRating, totalCount, reviews } = reviewData;

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-xl font-bold pt-6">후기</h2>
      <div className="flex gap-4">
        <p className="text-5xl font-bold">{averageRating}</p>
        <div>
          <p className="text-base font-normal">{ratingToText(averageRating)}</p>
          <p className="flex gap-2 text-base font-normal">
            <img className="w-4" src="/assets/star_on_icon.svg" alt="rating star" />
            {totalCount}개 후기
          </p>
        </div>
      </div>
      {/* 리뷰 List */}
      {totalCount > 0 ? (
        <div className="w-full">
          {reviews.map((review) => (
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
      ) : null}
    </div>
  );
};

export default Reviews;
