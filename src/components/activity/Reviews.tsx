import { useEffect, useState } from 'react';
import axios from '../../lib/axios';

interface ReviewsProps {
  id: string;
}

const Reviews: React.FC<ReviewsProps> = ({ id }) => {
  const [reviewData, setReviewData] = useState({
    averageRating: 0,
    totalCount: 0,
    reviews: [
      {
        id: 0,
        user: {
          profileImageUrl: '',
          nickname: '',
          id: 0,
          activityId: 0,
          rating: 0,
          content: '',
          createdAt: '',
          updatedAt: '',
        },
      },
    ],
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
    const getData = async () => {
      const response = await axios.get(`/activities/${id}/reviews`);
      setReviewData(response.data);
    };

    getData();
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
            <img
              className="w-4"
              src="/assets/star_on_icon.svg"
              alt="rating star"
            />
            {totalCount}개 후기
          </p>
        </div>
      </div>
      {/* 리뷰 List */}
      {/* Todo: 후기작성 기능 추가되면 실제 데이터 사용하여 구현 예정 @chaemin */}
      {totalCount > 0 ? (
        <div className="w-full">
          <div>{reviews[0].user.profileImageUrl}</div>
          <div>이름</div>
          <div>날짜</div>
          <div>리뷰 내용</div>
          <div className="w-full h-0.5 bg-gray-40" />
        </div>
      ) : null}

      <div>페이지네이션 버튼</div>
    </div>
  );
};

export default Reviews;
