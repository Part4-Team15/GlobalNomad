import React, { useState, useRef } from 'react';
import { SubImage } from '@/types/activityPage';
import postAssignImage from '@/api/postAssignImage';
import Toast from '@/utils/Toast';
import useMergeModifyData from '@/hooks/useMergeModifyData';

const MAX_SIZE = 4;

interface ModifyIntroImageProps {
  subImages: SubImage[];
}

const ModifyIntroImage = ({ subImages }: ModifyIntroImageProps) => {
  const { mergeIntroImage, deleteIntroImageId, deleteIntroImageUrl } = useMergeModifyData();

  const [introImage, setIntroImage] = useState<SubImage[]>(subImages);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIntroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (introImage?.length === MAX_SIZE) {
      Toast.error('소개 이미지는 최대 4개까지 등록 가능합니다.');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await postAssignImage(formData);
        if (response && response.activityImageUrl) {
          const imageUrl = response.activityImageUrl;

          setIntroImage((prevImages) => {
            const updatedImages = [...prevImages, { imageUrl }];
            return updatedImages;
          });

          mergeIntroImage(imageUrl);
        }

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRemoveImage = (index: number): void => {
    const removeIntroImage = introImage[index];
    setIntroImage((prevImages: SubImage[]) => {
      const updatedImages = prevImages.filter((_: SubImage, i: number) => i !== index);
      return updatedImages;
    });

    if (removeIntroImage.id) {
      deleteIntroImageId(removeIntroImage);
    } else {
      deleteIntroImageUrl(removeIntroImage);
    }
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
            ref={inputRef}
            id="introImageInput"
            type="file"
            accept="image/jpeg, image/png"
            style={{ display: 'none' }}
            onChange={handleIntroImageUpload}
          />
        </div>
        {/* 내 이미지 띄우기 */}
        {introImage &&
          introImage.map((image, index) => (
            <div
              key={image.imageUrl}
              className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
              style={{
                backgroundImage: `url(${image.imageUrl})`,
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

export default ModifyIntroImage;
