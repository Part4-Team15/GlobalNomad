interface NotificationDropdownItemProps {
  content: string;
}

const NotificationDropdownItem = ({ content }: NotificationDropdownItemProps) => {
  const reservationStatus = content.slice(content.length - 8, content.length - 6);
  return (
    <div className="flex flex-col w-90 bg-white rounded-md p-2 gap-1">
      <div className="flex justify-between">
        <img
          src={`/assets/circle_${reservationStatus === '승인' ? 'blue' : 'red'}.svg`}
          alt="Confirmed Chip"
        />
        <img
          className="w-5 opacity-50 cursor-pointer"
          src="/assets/x_btn.svg"
          alt="Remove Notification Button"
        />
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
      <div className="opacity-50 text-sm">1분 전</div>
    </div>
  );
};

export default NotificationDropdownItem;
