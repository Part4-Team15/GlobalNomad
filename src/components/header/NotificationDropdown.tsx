import { useInfiniteQuery } from '@tanstack/react-query';
import getMyNotification from '@/api/getMyNotofication';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import queryClient from '@/lib/queryClient';
import { NotificationDataType } from '@/types/notification';
import NotificationDropdownItem from './NotificationDropdownItem';
import '../../styles/customScrollbar.css';

const NotificationDropdown = ({
  setDropdownIsOpen,
}: {
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, fetchNextPage } = useInfiniteQuery<NotificationDataType>({
    queryKey: ['notifications', 10],
    queryFn: getMyNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
  const totalCount = data?.pages[0]?.totalCount || 0;
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  const handleModalClose = () => {
    queryClient.resetQueries({ queryKey: ['notifications', 10] });
    setDropdownIsOpen(false);
  };
  const { inView, ref } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col absolute top-[63px] right-[-100px] md:right-[-30px] z-20 w-[368px] rounded-md bg-green-10 shadow-md border-1 py-6 px-4 gap-3 h-[300px] overflow-y-auto sm:w-screen sm:top-0 sm:right-0 sm:fixed sm:inset-0 sm:h-screen sm:rounded-none">
      {totalCount === 0 ? (
        <div>모든 알림을 확인했습니다!</div>
      ) : (
        <>
          <div className="w-full flex justify-between">
            <div className="font-bold text-xl">알림 {totalCount}개</div>
            <button type="button" onClick={handleModalClose}>
              <img className="w-5 cursor-pointer" src="/assets/x_btn.svg" alt="Close Box Button" />
            </button>
          </div>
          <ol className="overflow-y-auto custom-scrollbar flex flex-col w-[328px] rounded-md  gap-1 sm:w-full">
            {notifications.map((item) => (
              <NotificationDropdownItem
                key={item.id}
                content={item.content}
                updatedAt={item.updatedAt}
                notificationId={item.id}
              />
            ))}
            <div ref={ref} className="w-[5px] h-[5px]">
              &nbsp;
            </div>
          </ol>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
