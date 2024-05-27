import React, { useState } from 'react';

const AssignBannerImage = () => {
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setBannerImage(dataURL);
      };
      reader.readAsDataURL(file);
      console.log(bannerImage);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(undefined);
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">배너 이미지</span>
      <div className=" grid w-[100%] grid-flow-row auto-rows-[minmax(0,2fr)] lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
        <div>
          <label
            className=" flex flex-col items-center justify-center p-[38px] gap-[30px] rounded-xl border border-dashed border-gray-80 cursor-pointer"
            htmlFor="imageInput"
          >
            <img src="/assets/plus_icon.svg" alt="plusIcon" />
            <span>이미지 등록</span>
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
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

export default AssignBannerImage;
