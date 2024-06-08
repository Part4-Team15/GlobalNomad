import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { useInfiniteQuery } from '@tanstack/react-query';
import getMyNotification from '@/api/getMyNotofication';
import NotificationDropdown from './NotificationDropdown';

interface Notifications {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface NotificationDataType {
  totalCount: number;
  notifications: Notifications[];
  cursorId: number;
}
const Notification = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));
  const { data } = useInfiniteQuery<NotificationDataType>({
    queryKey: ['notifications'],
    queryFn: getMyNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const totalCount = data?.pages[0]?.totalCount || 0;
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];
  return (
    <div ref={dropdownRef} className="relative">
      <img
        className="cursor-pointer"
        src="/assets/notification_icon.svg"
        alt="notification_icon"
        onClick={toggleDropdown}
      />
      {totalCount !== 0 && (
        <div
          className="w-[10px] h-[10px] bg-yellow rounded-full cursor-pointer top-1 right-0 absolute"
          onClick={toggleDropdown}
        />
      )}

      {dropdownIsOpen && (
        <NotificationDropdown notifications={notifications} totalCount={totalCount} />
      )}
    </div>
  );
};

export default Notification;
