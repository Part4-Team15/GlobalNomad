const ReserveFormSkeleton = () => {
  return (
    <div className="w-full border-2 border-solid rounded-lg border-gray-30">
      <div className="flex flex-col gap-4 p-4">
        <div className="w-1/2 h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-full h-[1px] bg-gray-40" />
        {/* 예약 현황 캘린더 */}
        <div className="w-1/4 h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-full h-[250px] md:h-0 bg-gray-300 rounded-3xl" />
        <div className="w-1/2 h-[30px] md:h-0 bg-gray-300 rounded-3xl" />
        <div className="w-2/3 h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-full h-[1px] bg-gray-40" />
        {/* 참여 인원 수 */}
        <div className="w-1/3 h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-1/2 h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-full h-[30px] bg-gray-300 rounded-3xl" />
        <div className="w-full h-[1px] bg-gray-40" />
        {/* 총 합계 */}
        <div className="flex justify-between">
          <div className="w-1/3 h-[30px] bg-gray-300 rounded-3xl" />
          <div className="w-1/2 h-[30px] bg-gray-300 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default ReserveFormSkeleton;
