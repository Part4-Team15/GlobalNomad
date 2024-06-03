import { useState } from 'react';
import ActivityDrownDownList from './ActivityDropDownList';

const ActivityDropDownBox = () => {
  const [viewDropDownList, setViewDropDownList] = useState(false);

  const toggleDropDown = () => {
    setViewDropDownList((prev) => !prev);
  };
  return (
    <div className="relative">
      <label className="absolute bg-white top-[-10px] left-4 text-[#121121] px-1">체험명</label>
      <input className="rounded border border-gray-70 w-full pl-4 py-5 outline-none" />
      <button type="button" onClick={toggleDropDown}>
        <img
          src="assets/chevron_down.svg"
          alt="chevron-down-icon"
          className="absolute w-6 top-5 right-3 cursor-pointer"
        />
      </button>
      {viewDropDownList && <ActivityDrownDownList />}
    </div>
  );
};

export default ActivityDropDownBox;
