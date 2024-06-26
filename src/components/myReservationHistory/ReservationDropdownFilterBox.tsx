const ReservationDropdownFilterBox = ({
  statusKoreanName,
  statusName,
  setStatus,
}: {
  statusKoreanName: string;
  statusName: string;
  setStatus: (status: string) => void;
}) => {
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setStatus(statusName);
  };
  return (
    <li>
      <button
        type="button"
        className="px-[46px] py-[18px] w-[160px] text-[#4B4B4B] dark:text-darkMode-white-10"
        onClick={handleFilterClick}
      >
        {statusKoreanName}
      </button>
    </li>
  );
};
export default ReservationDropdownFilterBox;
