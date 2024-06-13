import Skeleton from '../Skeleton';

const PopularCardSkeleton = () => {
  return (
    <Skeleton className="rounded-3xl shadow-custom sm:w-[186px] sm:h-[186px]">
      <div className="absolute bottom-8 left-5 flex flex-col gap-5 z-10 sm:bottom-6 sm:w-[146px] sm:gap-[6px]">
        <div className="flex gap-1 items-center">
          <img src="/assets/bold_star.svg" alt="little-star" />
          <p className="w-12 h-[14px] bg-gray-100 rounded-3xl sm:w-7" />
        </div>
        <div className="w-[230px] h-[30px] bg-gray-100 rounded-xl sm:w-[130px] sm:h-[18px]" />
        <div className="flex items-center gap-1">
          <p className="w-[130px] h-5 bg-gray-100 rounded-3xl sm:w-16 sm:h-[14px]" />
          <span className="text-sm text-gray-100 font-bold">/</span>
          <p className="w-5 h-5 bg-gray-100 rounded-xl sm:h-[14px]" />
        </div>
      </div>
      <div className="w-96 h-96 bg-gray-300 rounded-3xl sm:w-[186px] sm:h-[186px]" />
    </Skeleton>
  );
};

export default PopularCardSkeleton;
