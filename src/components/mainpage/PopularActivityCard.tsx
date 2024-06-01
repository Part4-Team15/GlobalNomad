import { Link } from 'react-router-dom';
import { ActivityCardProps } from './ActivityCard';

const PopularActivityCard = ({ cardData }: ActivityCardProps) => {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = cardData;

  return (
    <Link to={`/activity/${id}`}>
      <div className="relative">
        <div className="absolute bottom-8 left-5 flex flex-col gap-5 w-[230px] text-white z-10">
          <div className="flex gap-1">
            <img src="/assets/bold_star.svg" alt="little-star" />
            <p className="text-sm font-bold">{`${rating} (${reviewCount})`}</p>
          </div>
          <div className="text-3xl font-bold">{title}</div>
          <div className="flex items-center gap-1 text-xl font-bold">
            {`₩ ${price}`}
            <span className="text-sm text-gray-60">/인</span>
          </div>
        </div>
        <div className="relative w-96 h-96 bg-cover bg-center rounded-3xl" style={{ backgroundImage: `url('${bannerImageUrl}')` }}>
          <div className="absolute inset-0 bg-black opacity-30 rounded-3xl" />
        </div>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
