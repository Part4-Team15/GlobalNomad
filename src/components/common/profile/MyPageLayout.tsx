import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import MyPageProfile from './MyPageProfile';

const MyPageLayout = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isMyProfilePage, setIsMyProfilePage] = useState<boolean>(false);
  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[72px] md:px-6 md:justify-normal md:gap-4 sm:block sm:px-[16px] md:pt-[24px] sm:pt-[24px]">
      <MyPageProfile
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setIsMyProfilePage={setIsMyProfilePage}
        isMyProfilePage={isMyProfilePage}
      />
      <Outlet context={{ uploadedImage, isMyProfilePage }} />
    </div>
  );
};

export default MyPageLayout;
