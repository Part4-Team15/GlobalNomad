import priceToWon from '@/utils/priceToWon';
import CustomKebabMenu from './CustomKebabMenu';

interface Activity {
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
}

// 목업데이터
export const activities: Activity[] = [
  {
    id: 1,
    userId: 1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: '예약에 대한 설명',
    category: '예약_카테고리',
    price: 10000,
    address: '예약_주소',
    bannerImageUrl: 'https://picsum.photos/200/300',
    rating: 4.9,
    reviewCount: 293,
    createdAt: '2024-05-25T14:47:09.208Z',
    updatedAt: '2024-05-25T14:47:09.208Z',
  },
  {
    id: 2,
    userId: 2,
    title: 'B-boy 댄스 배우기',
    description: '예약에 대한 설명',
    category: '예약_카테고리',
    price: 10000,
    address: '예약_주소',
    bannerImageUrl: 'https://picsum.photos/200/300',
    rating: 4.9,
    reviewCount: 293,
    createdAt: '2024-05-24T10:30:00.000Z',
    updatedAt: '2024-05-24T10:30:00.000Z',
  },
  {
    id: 3,
    userId: 1,
    title: '발레 배우기',
    description: '예약에 대한 설명',
    category: '예약_카테고리',
    price: 10000,
    address: '예약_주소',
    bannerImageUrl: 'https://picsum.photos/200/300',
    rating: 4.9,
    reviewCount: 293,
    createdAt: '2024-05-23T09:00:00.000Z',
    updatedAt: '2024-05-23T09:00:00.000Z',
  },
];

const ReservationCard = ({ activity }: { activity: Activity }) => {
  return (
    <li className="rounded-3xl flex w-full h-[12.75rem] md:h-[9.75rem] sm:h-32 sm:min-w-[21.5rem] shadow-md">
      <div className="rounded-l-3xl w-[12.75rem] h-[12.75rem] md:w-[9.75rem] md:h-[9.75rem] sm:w-32 sm:h-32">
        <img
          className="w-full h-full object-cover"
          src={activity.bannerImageUrl}
          alt={activity.title}
        />
      </div>
      <div className="p-5 md:p-3 flex justify-between flex-col gap-4 flex-grow">
        <div>
          <p className="mb-[0.375rem] sm:mb-0 font-bold flex items-center gap-2">
            <span className="w-5 h-5 inline-flex justify-center items-center sm:w-[1rem] sm:h-[1rem]">
              <img src="/assets/star_on_icon.svg" alt="starIcon" />
            </span>
            <span className="sm:text-[0.875rem]">
              {activity.rating} ({activity.reviewCount})
            </span>
          </p>
          <p className="text-[1.25rem] leading-relaxed font-bold md:text-[1.125rem] sm:text-[0.875rem]">
            {activity.title}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-[1.5rem] md:text-[1.25rem] sm:text-[1rem]">
            {priceToWon(activity.price)}
          </p>
          <CustomKebabMenu
            options={[
              { label: '수정하기', onClick: () => console.log('안녕') },
              { label: '삭제하기', onClick: () => console.log('안녕') },
            ]}
          />
        </div>
      </div>
    </li>
  );
};

export default ReservationCard;
