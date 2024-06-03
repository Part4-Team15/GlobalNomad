import React, { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import postAssignImage from '@/api/postAssignImage';
import mergeAssignData from './utils/mergeAssignData';

const ModifyBannerImage = () => {
  const queryClient = useQueryClient();
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await postAssignImage(formData);
        if (response && response.activityImageUrl) {
          const imageUrl = response.activityImageUrl;
          setBannerImage(imageUrl);
          queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
            return mergeAssignData(oldData, { bannerImageUrl: imageUrl });
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
    setBannerImage(null);
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { bannerImageUrl: undefined });
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
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleBannerImageUpload}
          />
        </div>
        {/* 배너 이미지 띄우기 */}
        {bannerImage && (
          <div
            className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: `url(${bannerImage})`,
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
