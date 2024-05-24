import React from 'react';
import profileImage from '../common/profile/profileTestImage.svg';

const AssignIntroImage = () => (
  <div className=" flex w-[100%] flex-col items-start gap-6">
    <span className=" text-black text-2xl font-bold">소개 이미지</span>
    <div className=" grid w-[100%] grid-flow-row auto-rows-[minmax(0,2fr)] lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
      <div className=" flex flex-col items-center justify-center p-[38px] gap-[30px] rounded-xl border border-dashed border-gray-80">
        <img src="/assets/plus_icon.svg" alt="plusIcon" />
        <span>이미지 등록</span>
      </div>
      {/* 내 이미지 띄우기 */}
      <div
        className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: `url(${profileImage})`,
        }}
      >
        <img
          className=" absolute top-[-10px] right-[-10px]"
          src="/assets/white_x_btn.svg"
          alt="whiteXBtn"
        />
      </div>

      <div
        className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: `url(${profileImage})`,
        }}
      >
        <img
          className=" absolute top-[-10px] right-[-10px]"
          src="/assets/white_x_btn.svg"
          alt="whiteXBtn"
        />
      </div>

      <div
        className=" relative rounded-xl bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: `url(${profileImage})`,
        }}
      >
        <img
          className=" absolute top-[-10px] right-[-10px]"
          src="/assets/white_x_btn.svg"
          alt="whiteXBtn"
        />
      </div>
    </div>
  </div>
);

export default AssignIntroImage;
