const MainBanner = () => {
  const calendarNum = new Date().getMonth() + 1;
  return (
    <div
      className="relative flex justify-center bg-cover bg-center w-full h-[600px] sm:h-[240px]"
      style={{ backgroundImage: "url('/assets/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-30 dark:bg-darkMode-gray-20" />
      <div className="w-pc flex flex-col justify-center px-2 z-10 lg:w-[1000px] lg:px-0 md:w-tab md:px-0 sm:w-mob sm:px-0">
        <div className="top-5 flex flex-col gap-5 w-[502px] md:w-[440px] sm:w-[184px]">
          <h1 className="text-white text-6xl font-bold leading-tight md:text-[54px] sm:text-2xl">함께 배우면 즐거운 스트릿 댄스</h1>
          <p className="text-white text-2xl font-bold md:text-xl sm:text-sm">{`${calendarNum}월의 인기 체험🔥`}</p>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
