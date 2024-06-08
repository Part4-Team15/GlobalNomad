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

interface NotificationDropdownProps {
  notifications: Notifications[];
  totalCount: number;
}

const NotificationDropdown = ({ notifications, totalCount }: NotificationDropdownProps) => {
  return (
    <div className="flex flex-col absolute top-12 right-12 z-20 w-[368px] rounded-md bg-green-10 shadow-md border-1 py-6 px-4 gap-3 h-[300px] overflow-y-auto">
      <div className="w-full flex justify-between">
        <div className="font-bold text-xl">알림 {totalCount}개</div>
        <img className="w-5 cursor-pointer" src="/assets/x_btn.svg" alt="Close Box Button" />
      </div>
      {notifications.map((item) => {
        return <NotificationDropdownItem content={item.content} />;
      })}
    </div>
  );
};

export default NotificationDropdown;
