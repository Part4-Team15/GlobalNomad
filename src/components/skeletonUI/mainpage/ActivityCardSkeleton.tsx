import Skeleton from '../Skeleton';

const ActivityCardSkeleton = () => {
  return (
    <Skeleton
      className="flex flex-col items-center gap-4 flex-shrink-0 rounded-3xl
    dark:before:via-darkMode-black-10/30 dark:before:border-darkMode-gray-10/10">
      <div className="w-[278px] h-[278px] bg-gray-300 rounded-3xl dark:bg-gray-80 lg:w-[232px] lg:h-[232px]
        md:w-[221px] md:h-[221px] sm:w-[168px] sm:h-[168px]"
      />
      <div className="w-[274px] flex flex-col gap-[10px] px-2 py-3 lg:w-[232px] md:w-[221px] sm:w-[168px]">
        <div className="flex items-center gap-1">
          <img className="z-10" src="/assets/bold_star.svg" alt="little-star" />
          <p className="w-8 h-4 bg-gray-300 rounded-xl dark:bg-gray-80 sm:w-7 sm:h-[14px]" />
        </div>
        <div className="w-[221px] h-6 bg-gray-300 rounded-xl mb-[5px] dark:bg-gray-80 md:w-48 sm:w-36 sm:h-[18px]" />
        <div className="h-6 flex items-center gap-1 sm:h-5">
          <div className="w-[130px] h-[28px] bg-gray-300 rounded-xl dark:bg-gray-80 md:w-[120px] sm:w-24 sm:h-5" />
          <span className="z-10 dark:text-darkMode-gray-10 ">/</span>
          <div className="w-8 h-[28px] bg-gray-300 rounded-xl dark:bg-gray-80 sm:w-5 sm:h-5 sm:rounded-lg" />
        </div>
      </div>
    </Skeleton>
  );
};

export default ActivityCardSkeleton;
