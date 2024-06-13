import Skeleton from './Skeleton';

const ActivityCardSkeleton = () => {
  return (
    <Skeleton className="flex flex-col items-center gap-4 flex-shrink-0 bg-gray-10 rounded-3xl">
      <div className="w-[282px] h-[282px] bg-gray-300 rounded-3xl
        md:w-[221px] md:h-[221px] sm:w-[168px] sm:h-[168px]"
      />
      <div className="w-[274px] flex flex-col gap-[10px] px-2 py-3 md:w-[221px] sm:w-[168px]">
        <div className="flex items-center gap-1">
          <img className="z-10" src="/assets/bold_star.svg" alt="little-star" />
          <p className="w-8 h-4 bg-gray-300 rounded-xl sm:w-5 sm:h-[14px]" />
        </div>
        <div className="h-6 bg-gray-300 rounded-xl mb-[5px] sm:h-[18px]" />
        <div className="h-6 flex items-center gap-1 sm:h-5">
          <div className="w-[130px] h-[28px] bg-gray-300 rounded-xl sm:h-5" />
          <span className="z-10">/</span>
          <div className="w-10 h-[28px] bg-gray-300 rounded-xl sm:h-5" />
        </div>
      </div>
    </Skeleton>
  );
};

export default ActivityCardSkeleton;
