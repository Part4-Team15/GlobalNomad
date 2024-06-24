import React from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import { useOutletContext } from 'react-router-dom';

interface OutletProps {
  uploadedImage: string | null;
  isShowProfileForm: boolean;
  isShowDefaultImage: boolean;
}

const MyProfile = () => {
  const { uploadedImage, isShowProfileForm, isShowDefaultImage } = useOutletContext<OutletProps>();
  return (
    <MyPageForm
      uploadedImage={uploadedImage}
      isShowProfileForm={isShowProfileForm}
      isShowDefaultImage={isShowDefaultImage}
    />
  );
};

export default MyProfile;
