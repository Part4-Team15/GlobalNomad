import priceToWon from '@/utils/priceToWon';
import { Link } from 'react-router-dom';

export interface ActivityCardProps {
  cardData: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

// api 예시
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&page=1&size=20
// 카테고리 검색
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&category=%ED%88%AC%EC%96%B4&page=1&size=20
// 키워드 검색
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&keyword=%ED%85%8C%EC%8A%A4%ED%8A%B8&page=1&size=20
// 오름차순 정렬
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&sort=price_asc&page=1&size=20
// 내림차순 정렬
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&sort=price_desc&page=1&size=20
// 인기순
// https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&sort=most_reviewed&page=1&size=20
// 각 체험 카드 조회
// https://sp-globalnomad-api.vercel.app/4-15/activities/901

const ActivityCard = ({ cardData }: ActivityCardProps) => {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = cardData;

  return (
    <Link to={`/activity/${id}`}>
      <div className="flex flex-col gap-4">
        <div
          className="w-[282px] h-[282px] bg-cover bg-center rounded-3xl md:w-56 md:h-56 sm:w-[168px] sm:h-[168px]"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        />
        <div className="flex flex-col gap-[10px] w-[282px] text-black md:w-56 sm:w-[168px]">
          <div className="flex gap-1">
            <img src="/assets/bold_star.svg" alt="little-star" />
            <p className="font-medium">
              {rating}
              <span className="text-gray-60">{` (${reviewCount})`}</span>
            </p>
          </div>
          <div className="text-2xl font-semibold mb-[5px] sm:text-lg">{title}</div>
          <div className="flex items-center gap-1 text-[28px] font-bold sm:text-xl">
            {priceToWon(price)}
            <span className="text-xl text-gray-80 sm:text-base">/인</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
