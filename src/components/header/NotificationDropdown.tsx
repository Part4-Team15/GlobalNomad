const NotificationDropdown = () => {
  return (
    <div className="flex flex-col absolute top-12 right-12 z-20 w-[368px] rounded-md bg-green-10 shadow-md border-1 py-6 px-4 gap-3">
      <div className="w-full flex justify-between">
        <div className="font-bold text-xl">알림 0개</div>
        <img className="w-5 cursor-pointer" src="/assets/x_btn.svg" alt="Close Box Button" />
      </div>
      <div className="flex flex-col w-90 bg-white rounded-md p-2 gap-1">
        <div className="flex justify-between">
          <img src="/assets/circle_red.svg" alt="Confirmed Chip" />
          <img
            className="w-5 opacity-50 cursor-pointer"
            src="/assets/x_btn.svg"
            alt="Remove Notification Button"
          />
        </div>
        <div className="">
          함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.
        </div>
        <div className="opacity-50 text-sm">1분 전</div>
      </div>
      <div className="flex flex-col w-90 bg-white rounded-md p-2 gap-1">
        <div className="flex justify-between">
          <img src="/assets/circle_blue.svg" alt="Declined Chip" />
          <img
            className="w-5 opacity-50 cursor-pointer"
            src="/assets/x_btn.svg"
            alt="Remove Notification Button"
          />
        </div>
        <div className="">
          함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.
        </div>
        <div className="opacity-50 text-sm">1분 전</div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
