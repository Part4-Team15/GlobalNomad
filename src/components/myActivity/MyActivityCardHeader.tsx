import { useNavigate } from 'react-router-dom';

const MyActivityCardHeader = () => {
  const navigate = useNavigate();

  const handleAssignClick = () => {
    navigate('/my/activity/assign');
  };

  return (
    <div className="w-full min-w-[21.5rem] flex justify-between mb-6">
      <h2 className=" text-black font-bold text-[32px] self-start dark:text-darkMode-white-10">
        내 체험 관리
      </h2>
      <button
        type="button"
        className="flex min-w-[7.5rem] h-12 p-2.5 justify-center items-center gap-1 self-stretch rounded border-[1.5px] border-green-80 bg-[#121] text-white dark:bg-darkMode-black-20"
        onClick={handleAssignClick}
      >
        체험 등록하기
      </button>
    </div>
  );
};

export default MyActivityCardHeader;
