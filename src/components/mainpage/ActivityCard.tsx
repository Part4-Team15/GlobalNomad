const ActivityCard = () => {
  const description = '함께 배우면 즐거운 스트릿 댄스';
  const price = 38000;
  const starScore = 4.9;
  const popularScore = 793;
  return (
    <div>
      <img className="w-full rounded-3xl" src="/assets/banner.jpg" alt="activity" />
      <div className="flex flex-col gap-[10px] w-[282px] text-black">
        <div className="flex gap-1">
          <img src="/assets/bold_star.svg" alt="little-star" />
          <p className="text-sm font-bold">
            {starScore}
            <span className="text-gray-60">{` (${popularScore})`}</span>
          </p>
        </div>
        <div className="text-2xl font-bold">{description}</div>
        <div className="flex items-center gap-1 text-[28px] font-bold">
          {`₩ ${price}`}
          <span className="text-xl text-gray-80">/인</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
