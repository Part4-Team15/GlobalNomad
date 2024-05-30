const ReservationDropdownFilterBox = ({
  statusKoreanName,
  statusName,
  setStatus,
}: {
  statusKoreanName: string;
  statusName: string;
  setStatus: (status: string) => void;
}) => {
  const handleFilterClick = () => {
    setStatus(statusName);
  };
  return (
    <button
      type="button"
      className="px-[46px] py-[18px] w-[160px]"
      onClick={handleFilterClick}
    >
      {statusKoreanName}
    </button>
  );
};
export default ReservationDropdownFilterBox;
