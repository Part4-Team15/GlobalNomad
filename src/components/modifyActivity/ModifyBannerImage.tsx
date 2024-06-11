import React, { useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import postAssignImage from '@/api/postAssignImage';
import { ModifyData } from '@/types/modifyActivityPage';
import mergeModifyData from './utils/mergeModifyData';

interface ModifyBannerImageProps {
  bannerImageUrl: string;
}

const ModifyBannerImage = ({ bannerImageUrl }: ModifyBannerImageProps) => {
  const queryClient = useQueryClient();
  const [localBannerImage, setLocalBannerImage] = useState<string | null>(bannerImageUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  // 리액트 쿼리 초기값 설정
  useEffect(() => {
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { bannerImageUrl });
    });
  }, []);

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await postAssignImage(formData);
        if (response && response.activityImageUrl) {
          const imageUrl = response.activityImageUrl;
          setLocalBannerImage(imageUrl);
          queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
            return mergeModifyData(oldData, { bannerImageUrl: imageUrl });
          });
        }
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRemoveImage = () => {
    setLocalBannerImage(null);
    queryClient.setQueryData<ModifyData>(['modifyData'], (oldData) => {
      return mergeModifyData(oldData, { bannerImageUrl: undefined });
    });
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">배너 이미지</span>
      <div className=" grid w-[100%] grid-flow-row auto-rows-[minmax(0,2fr)] lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
        <div>
          <label
            className=" flex flex-col items-center justify-center p-[38px] gap-[30px] rounded-xl border border-dashed border-gray-80 cursor-pointer"
            htmlFor="bannerImageInput"
          >
            <img src="/assets/plus_icon.svg" alt="plusIcon" />
            <span>이미지 등록</span>
          </label>
          <input
            ref={inputRef}
            id="bannerImageInput"
            type="file"
            accept="image/jpeg, image/png"
            style={{ display: 'none' }}
            onChange={handleBannerImageUpload}
          />
        </div>
        {/* 배너 이미지 띄우기 */}
        {localBannerImage && (
          <div
            className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: `url(${localBannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              className=" absolute top-[-10px] right-[-10px]"
              src="/assets/white_x_btn.svg"
              alt="whiteXBtn"
              onClick={handleRemoveImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyBannerImage;
