import queryClient from '@/lib/queryClient';
import getDeleteNotification from '@/api/getDeleteNotification';
import { useMutation } from '@tanstack/react-query';

const formatUpdatedAt = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - updatedDate.getTime();
  const diffInMin = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}년 전`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  }
  if (diffInMin > 0) {
    return `${diffInMin}분 전`;
  }
  return '방금 전';
};
const NotificationDropdownItem = ({
  content,
  updatedAt,
  notificationId,
}: {
  content: string;
  updatedAt: string;
  notificationId: number;
}) => {
  const { mutate } = useMutation({
    mutationFn: getDeleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const onClickDeleteButton = () => {
    mutate(notificationId);
  };

  const reservationStatus = content.slice(content.length - 8, content.length - 6);
  return (
    <div className="flex flex-col w-90 bg-white rounded-md p-2 gap-1">
      <div className="flex justify-between">
        <img
          src={`/assets/circle_${reservationStatus === '승인' ? 'blue' : 'red'}.svg`}
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
      <div className="opacity-50 text-sm">{formatUpdatedAt(updatedAt)}</div>
    </div>
  );
};

export default NotificationDropdownItem;
