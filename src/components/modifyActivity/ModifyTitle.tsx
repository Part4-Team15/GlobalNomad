import React, { useState, useEffect } from 'react';
import useMergeModifyData from '@/hooks/useMergeModifyData';

interface ModifyTitleProps {
  title: string;
}

const ModifyTitle = ({ title }: ModifyTitleProps) => {
  const { mergeTitle } = useMergeModifyData();
  const [localTitle, setLocalTitle] = useState(title);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    mergeTitle(title);
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    mergeTitle(newTitle);
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
      <input
        className="w-[100%] outline-none dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
        value={localTitle}
        onChange={handleChangeTitle}
        placeholder="제목"
      />
    </div>
  );
};

export default ModifyTitle;
