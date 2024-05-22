const MainBanner = () => {
  const calendarNum = 1;
  return (
    <div className="relative bg-[url('../public/assets/banner.jpg')] bg-cover bg-center h-[600px]">
      <div className="absolute inset-0 bg-black opacity-40 z-1" />
      <div className="absolute w-[1200px] flex flex-col items-center justify-center h-[600px]">
        <div className="top-5 flex flex-col gap-5 w-[502px]">
          <div className="text-white text-6xl font-bold leading-tight">함께 배우면 즐거운 스트릿 댄스</div>
          <div className="text-white text-2xl font-bold">{`${calendarNum}월의 인기 체험🔥`}</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
