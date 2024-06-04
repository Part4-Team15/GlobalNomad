const MainBanner = () => {
  const calendarNum = 1;
  return (
    <div className="relative flex justify-center bg-cover bg-center h-[600px] sm:h-[240px]" style={{ backgroundImage: "url('/assets/banner.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="w-pc flex flex-col justify-center z-10 md:w-tab sm:w-mob">
        <div className="top-5 flex flex-col gap-5 w-[502px] md:w-[440px] sm:w-[184px]">
          <div className="text-white text-6xl font-bold leading-tight md:text-[54px] sm:text-2xl">함께 배우면 즐거운 스트릿 댄스</div>
          <div className="text-white text-2xl font-bold md:text-xl sm:text-sm">{`${calendarNum}월의 인기 체험🔥`}</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
