import { useInfiniteQuery } from '@tanstack/react-query';
import getMyNotification from '@/api/getMyNotofication';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import NotificationDropdownItem from './NotificationDropdownItem';

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

const NotificationDropdown = () => {
  const { data, fetchNextPage } = useInfiniteQuery<NotificationDataType>({
    queryKey: ['notifications'],
    queryFn: getMyNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
  const totalCount = data?.pages[0]?.totalCount || 0;
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  const { inView, ref } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col absolute top-12 right-12 z-20 w-[368px] rounded-md bg-green-10 shadow-md border-1 py-6 px-4 gap-3 h-[300px] overflow-y-auto">
      <div className="w-full flex justify-between">
        <div className="font-bold text-xl">알림 {totalCount}개</div>
        <img className="w-5 cursor-pointer" src="/assets/x_btn.svg" alt="Close Box Button" />
      </div>
      {notifications.map((item) => {
        return (
          <NotificationDropdownItem
            key={item.id}
            content={item.content}
            updatedAt={item.updatedAt}
          />
        );
      })}
      <div ref={ref} className="w-[5px] h-[5px]" />
    </div>
  );
};

export default NotificationDropdown;
