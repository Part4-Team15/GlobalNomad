import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ModifyData } from '@/types/modifyActivityPage';
import mergeModifyData from './utils/mergeModifyData';

interface ModifyDescriptionProps {
  description: string;
}

const ModifyDescription = ({ description }: ModifyDescriptionProps) => {
  const queryClient = useQueryClient();
  const [localDescription, setLocalDescription] = useState(description);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { description });
    });
  }, []);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setLocalDescription(newDescription);
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { description: newDescription });
    });
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
      <textarea
        className="w-[100%] h-[346px] outline-none resize-none"
        value={localDescription}
        onChange={handleChangeDescription}
        placeholder="설명"
      />
    </div>
  );
};

export default ModifyDescription;
