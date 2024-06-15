import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import priceToWon from '@/utils/priceToWon';
import CustomKebabMenu from './CustomKebabMenu';
import ExperienceDeleteModal from './ExperienceDeleteModal';
import ModalPortal from '../review/ModalPortal';

export interface Activity {
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

const ReservationCard = ({
  activity,
  onDelete,
}: {
  activity: Activity;
  onDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(activity.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <li className="rounded-3xl flex w-full h-[12.75rem] md:h-[9.75rem] sm:h-32 sm:min-w-[21.5rem] shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]  bg-white">
      <div className="w-[12.75rem] h-[12.75rem] md:w-[9.75rem] md:h-[9.75rem] sm:w-32 sm:h-32">
        <img
          className="w-full h-full object-cover rounded-l-3xl"
          src={activity.bannerImageUrl}
          alt={activity.title}
        />
      </div>
      <div className="p-5 md:p-3 sm:p-3 flex justify-between flex-col gap-4 flex-grow">
        <div>
          <p className="mb-[0.375rem] sm:mb-0 font-bold flex items-center gap-2">
            <span className="w-5 h-5 inline-flex justify-center items-center sm:w-[1rem] sm:h-[1rem]">
              <img src="/assets/star_on_icon.svg" alt="starIcon" />
            </span>
            <span className="text-[#1B1B1B] sm:text-[0.875rem]">
              {activity.rating} ({activity.reviewCount})
            </span>
          </p>
          <p className="text-[#112211] text-[1.25rem] leading-relaxed font-bold md:text-[1.125rem] sm:text-[0.875rem]">
            {activity.title}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-80 text-[1.5rem] md:text-[1.25rem] sm:text-[1rem]">
            {priceToWon(activity.price)}
          </p>
          <CustomKebabMenu
            options={[
              {
                label: '수정하기',
                onClick: () =>
                  navigate(`/my/activity/${activity.id}/modify`, {
                    state: { ...activity },
                  }),
              },
              { label: '삭제하기', onClick: handleDeleteClick },
            ]}
          />
        </div>
      </div>
      <ModalPortal>
        <ExperienceDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          activityId={activity.id}
          onDelete={handleDeleteConfirm}
        />
      </ModalPortal>
    </li>
  );
};

export default ReservationCard;
