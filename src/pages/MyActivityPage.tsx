import Profile from '@/components/common/profile/Profile';
import ReservationCard, {
  activities,
} from '@/components/myActivity/ReservationCard';

const MyActivityPage = () => {
  return (
    <section className=" bg-gray-10 px-4 py-16">
      <div className="flex max-w-[75rem] mx-auto gap-6 items-start">
        <Profile />
        {/* 내 체험 관리 헤더 */}
        <div className="w-full">
          <div className="flex justify-between mb-6">
            <h2 className=" text-black font-bold text-[32px] self-start">
              내 체험 관리
            </h2>
            <button
              type="button"
              className="flex w-[7.5rem] h-12 p-2.5 justify-center items-center gap-1 self-stretch rounded bg-[#121] text-white"
            >
              체험 등록하기
            </button>
          </div>
          {/* 체험 리스트 */}
          <section className="w-full">
            <ul className="flex flex-col gap-6">
              {activities.map((activity) => (
                <ReservationCard activity={activity} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default MyActivityPage;
