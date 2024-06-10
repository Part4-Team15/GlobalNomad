import { Dispatch, SetStateAction } from 'react';

const ActivityDropDownBox = ({
  selectedActivityTitle,
  setViewActivityDropDown,
}: {
  selectedActivityTitle: string | null;
  setViewActivityDropDown: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClickDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setViewActivityDropDown((prev) => !prev);
  };
  return (
    <div className="flex flex-col relative">
      <label className="absolute top-[-9px] px-1 bg-white left-5  text-[#121121]">체험명</label>
      <input
        type="text"
        className="border border-black pl-4 py-5 rounded outline-none"
        value={selectedActivityTitle || ''}
      />

      {/* 버튼 클릭시 모달 열기 */}
      <button type="button" className="cursor-pointer" onClick={handleClickDropDown}>
        <img
          src="assets/chevron_down.svg"
          alt="dropdown_icon"
          className="w-6 absolute top-5 right-3"
        />
      </button>
    </div>
  );
};

export default ActivityDropDownBox;
