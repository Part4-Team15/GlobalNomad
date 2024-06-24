import React, { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import useStore from '@/hooks/useStore';

interface ModifyAddressProps {
  address: string;
}

const ModifyAddress = ({ address }: ModifyAddressProps) => {
  const { mergeAddress } = useMergeModifyData();
  const { darkMode } = useStore();
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [localAddress, setLocalAddress] = useState<string>(address);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    mergeAddress(address);
  }, []);

  const handleOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const handleAddressSelect = (data: Address) => {
    setLocalAddress(data.address);
    mergeAddress(data.address);
    setIsOpenPost(false);
  };

  const closeModal = (): void => {
    setIsOpenPost(false);
  };

  const daumPostcodeTheme = darkMode
    ? {
        bgColor: '#242424', // 배경색
        searchBgColor: '#242424', // 검색창 배경색
        contentBgColor: '#242424', // 결과 배경색
        pageBgColor: '#242424', // 페이지 배경색
        textColor: '#FFFFFF', // 기본 글자색
        queryTextColor: '#FFFFFF', // 검색창 글자색
        postcodeTextColor: '#FFFFFF', // 우편번호 글자색
      }
    : {};

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <div className="w-[100%] flex justify-between pr-2">
        <span className=" text-black text-2xl font-bold dark:text-darkMode-white-10">주소</span>
        <button
          className="flex px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-sm font-bold"
          type="button"
          onClick={handleOpenPost}
        >
          주소 찾기
        </button>
      </div>
      <div
        className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
        onClick={handleOpenPost}
      >
        <input
          className="w-[100%] outline-none cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
          placeholder="주소를 입력해주세요"
          value={localAddress}
          readOnly
        />
      </div>
      {isOpenPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative bg-white rounded-lg shadow-lg p-11 w-full max-w-lg dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
              type="button"
            >
              <img src="/assets/x_btn.svg" alt="close" />
            </button>
            <DaumPostcode onComplete={handleAddressSelect} theme={daumPostcodeTheme} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyAddress;
