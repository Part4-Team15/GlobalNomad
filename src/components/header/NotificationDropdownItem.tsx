import queryClient from '@/lib/queryClient';
import getDeleteNotification from '@/api/getDeleteNotification';
import { useMutation } from '@tanstack/react-query';
import formatUpdatedAt from '@/lib/utils/formatUpdatedAt';
import { NotificationDropdownItemProps } from '@/types/notification';

const NotificationDropdownItem = ({
  content,
  updatedAt,
  notificationId,
}: NotificationDropdownItemProps) => {
  const { mutate } = useMutation({
    mutationFn: getDeleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 10] });
    },
  });

  const onClickDeleteButton = () => {
    mutate(notificationId);
  };

  const reservationStatus = content.slice(content.length - 8, content.length - 6);
  return (
    <li className="w-full px-3 py-4 bg-white rounded-md sm:text-[20px] dark:bg-darkMode-black-30">
      <div className="flex justify-between">
        <img
          src={`/assets/circle_${reservationStatus === '승인' ? 'blue' : 'red'}.svg`}
          className="sm:w-[10px] sm:h-[10px]"
          alt="Confirmed Chip"
        />
        <button type="button" onClick={onClickDeleteButton}>
          <img
            className="w-5 opacity-50 cursor-pointer"
            src="/assets/x_btn.svg"
            alt="Remove Notification Button"
          />
        </button>
      </div>
      <div>
        {content.split(reservationStatus)[0]}
        <div
          style={{
            color: reservationStatus === '승인' ? '#0085FF' : '#FF472E',
            display: 'inline',
          }}
        >
          {reservationStatus}
        </div>
        {content.split(reservationStatus)[1]}
      </div>
      <div className="opacity-50 text-sm mt-1 sm:text-[18px]">{formatUpdatedAt(updatedAt)}</div>
    </li>
  );
};

export default NotificationDropdownItem;
