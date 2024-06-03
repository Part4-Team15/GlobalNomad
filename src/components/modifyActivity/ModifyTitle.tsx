import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ModifyData } from '@/types/modifyActivityPage';
import mergeModifyData from './utils/mergeModifyData';

interface ModifyTitleProps {
  title: string;
}

const ModifyTitle = ({ title }: ModifyTitleProps) => {
  const queryClient = useQueryClient();
  const [localTitle, setLocalTitle] = useState(title);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { title });
    });
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { title: newTitle });
    });
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
      <input
        className="w-[100%] outline-none"
        value={localTitle}
        onChange={handleChangeTitle}
        placeholder="제목"
      />
    </div>
  );
};

export default ModifyTitle;
