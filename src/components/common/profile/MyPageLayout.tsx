import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile';

const MyPageLayout = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <Profile uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
      <Outlet context={{ uploadedImage }} />
    </div>
  );
};

export default MyPageLayout;
