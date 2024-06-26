import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import MyPageProfile from './MyPageProfile';

const MyPageLayout = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isShowProfileForm, setIsShowProfileForm] = useState<boolean>(false);
  const [isShowDefaultImage, setIsShowDefaultImage] = useState<boolean>(false);

  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[72px] pb-[72px] md:px-6 md:justify-normal md:gap-4 sm:block sm:px-[16px] md:pt-[24px] sm:pt-[24px] md:pb-[24px] sm:pb-[24px] dark:bg-darkMode-black-10">
      <MyPageProfile
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        isShowProfileForm={isShowProfileForm}
        setIsShowProfileForm={setIsShowProfileForm}
        isShowDefaultImage={isShowDefaultImage}
        setIsShowDefaultImage={setIsShowDefaultImage}
      />
      <div className="w-[800px] sm:w-full">
        <Outlet context={{ uploadedImage, isShowProfileForm, isShowDefaultImage }} />
      </div>
    </div>
  );
};

export default MyPageLayout;
