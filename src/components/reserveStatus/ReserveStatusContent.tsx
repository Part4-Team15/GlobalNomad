import ActivityDropDownBox from './ActivityDropDownBox';

const ReserveStatusContent = () => (
  <div className="w-[800px]">
    <div className="flex flex-col gap-8">
      <div className="text-[32px] font-bold">예약 현황</div>
      <ActivityDropDownBox />
    </div>
  </div>
);

export default ReserveStatusContent;
