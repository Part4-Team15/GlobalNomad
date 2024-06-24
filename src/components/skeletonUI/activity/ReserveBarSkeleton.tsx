const ReserveBarSkeleton = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full border-2 border-solid border-gray-30 bg-white z-30">
      <div className="flex justify-between p-4">
        <div className="w-[240px] flex flex-col">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col w-1/2 h-auto gap-2">
              <div className="w-full h-[30px] bg-gray-300 rounded-3xl" />
              <div className="w-2/3 h-[30px] bg-gray-300 rounded-3xl" />
            </div>
            <div className="w-1/3 h-[30px] bg-gray-300 rounded-3xl" />
          </div>
        </div>
        {/* 예약하기 버튼 */}
        <div className="w-1/3 h-[62px] bg-green-80 rounded-xl" />
      </div>
    </div>
  );
};

export default ReserveBarSkeleton;
