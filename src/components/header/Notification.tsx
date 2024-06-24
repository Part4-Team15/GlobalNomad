import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { useInfiniteQuery } from '@tanstack/react-query';
import getMyNotification from '@/api/getMyNotofication';
import queryClient from '@/lib/queryClient';
import { NotificationDataType } from '@/types/notification';
import NotificationDropdown from './NotificationDropdown';

const Notification = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    queryClient.resetQueries({ queryKey: ['notifications', 10] });
    setDropdownIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));
  const { data } = useInfiniteQuery<NotificationDataType>({
    queryKey: ['notifications', 10],
    queryFn: getMyNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const totalCount = data?.pages[0]?.totalCount || 0;
  return (
    <div ref={dropdownRef} className="relative">
      <img
        className="cursor-pointer w-5 h-5"
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

      {dropdownIsOpen && <NotificationDropdown setDropdownIsOpen={setDropdownIsOpen} />}
    </div>
  );
};

export default Notification;
