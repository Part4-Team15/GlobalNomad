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

const ActivityCard = ({ cardData }: ActivityCardProps) => {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = cardData;

  return (
    <Link to={`/activity/${id}`} className="group h-[435px] md:h-[373px] sm:h-[295px]" target="_blank">
      <div className="flex flex-col gap-4">
        <div
          className="w-[282px] h-[282px] bg-cover bg-center rounded-3xl group-hover:bg-extend md:w-[221px] md:h-[221px] sm:w-[168px] sm:h-[168px]"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        />
        <div className="flex flex-col gap-[10px] w-[282px] text-black leading-none px-2 py-2 group-hover:bg-blue-10 group-hover:rounded-2xl group-hover:text-blue-800 md:w-[221px] sm:w-[168px]">
          <div className="flex items-center gap-1">
            <img src="/assets/bold_star.svg" alt="little-star" />
            <p className="font-medium group-hover:text-blue-30 sm:text-sm">
              {rating}
              <span className="text-gray-60 group-hover:text-blue-800">{` (${reviewCount})`}</span>
            </p>
          </div>
          <div className="text-2xl font-semibold pb-[5px] sm:text-lg sm:leading-tight">{title}</div>
          <div className="flex items-center gap-1 text-[28px] font-bold group-hover:text-blue-30 sm:text-xl sm:leading-none">
            {priceToWon(price)}
            <span className="text-xl text-gray-80 font-normal group-hover:text-blue-800 sm:text-base">/인</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
