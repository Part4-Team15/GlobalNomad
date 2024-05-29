import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import mergeAssignData from './utils/mergeAssignData';

const MAX_SIZE = 4;

const AssignIntroImage = () => {
  const queryClient = useQueryClient();
  const [introImage, setIntroImage] = useState<string[]>([]);

  const handleIntroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        if (introImage?.length === MAX_SIZE) {
          // alert('소개 이미지는 최대 4개까지 등록 가능합니다.');
        } else {
          setIntroImage((prevImages) => {
            const updatedImages = [...prevImages, dataURL];
            queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
              return mergeAssignData(oldData, { introImageUrl: updatedImages });
            });
            return updatedImages;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number): void => {
    setIntroImage((prevImages: string[]) => {
      const updatedImages = prevImages.filter(
        (_: string, i: number) => i !== index,
      );
      queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
        return mergeAssignData(oldData, { introImageUrl: updatedImages });
      });
      return updatedImages;
    });
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">소개 이미지</span>
      <div className=" grid w-[100%] grid-flow-row auto-rows-[minmax(0,2fr)] lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
        <div>
          <label
            className=" flex flex-col items-center justify-center p-[38px] gap-[30px] rounded-xl border border-dashed border-gray-80 cursor-pointer"
            htmlFor="introImageInput"
          >
            <img src="/assets/plus_icon.svg" alt="plusIcon" />
            <span>이미지 등록</span>
          </label>
          <input
            id="introImageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleIntroImageUpload}
          />
        </div>
        {/* 내 이미지 띄우기 */}
        {introImage &&
          introImage.map((image, index) => (
            <div
              key={image}
              className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
              style={{
                backgroundImage: `url(${image})`,
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
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AssignIntroImage;
