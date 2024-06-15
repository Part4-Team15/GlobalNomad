import React, { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import { ModifyData } from '@/types/modifyActivityPage';
import mergeModifyData from './utils/mergeModifyData';

interface ModifyAddressProps {
  address: string;
}

const ModifyAddress = ({ address }: ModifyAddressProps) => {
  const queryClient = useQueryClient();
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [localAddress, setLocalAddress] = useState<string>(address);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { address });
    });
  }, []);

  const handleOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const handleAddressSelect = (data: Address) => {
    setLocalAddress(data.address);
    queryClient.setQueryData<ModifyData>(queryKeys.modifyData(), (oldData) => {
      return mergeModifyData(oldData, { address: data.address });
    });
    setIsOpenPost(false);
  };

  const closeModal = (): void => {
    setIsOpenPost(false);
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <div className="w-[100%] flex justify-between pr-2">
        <span className=" text-black text-2xl font-bold">주소</span>
        <button
          className="flex px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-sm font-bold"
          type="button"
          onClick={handleOpenPost}
        >
          주소 찾기
        </button>
      </div>
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
        <input
          className="w-[100%] outline-none"
          placeholder="주소를 입력해주세요"
          value={localAddress}
          readOnly
        />
      </div>
      {isOpenPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative bg-white rounded-lg shadow-lg p-11 w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
              type="button"
            >
              <img src="/assets/x_btn.svg" alt="close" />
            </button>
            <DaumPostcode onComplete={handleAddressSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyAddress;
