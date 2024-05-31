import React, { useState } from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import Profile from '../components/common/profile/Profile';

const MyPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <Profile
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <MyPageForm uploadedImage={uploadedImage} />
    </div>
  );
};

export default MyPage;
