import React from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import { useOutletContext } from 'react-router-dom';

interface OutletProps {
  uploadedImage: string | null;
  isShowProfileForm: boolean;
}

const MyProfile = () => {
  const { uploadedImage, isShowProfileForm } = useOutletContext<OutletProps>();
  return <MyPageForm uploadedImage={uploadedImage} isShowProfileForm={isShowProfileForm} />;
};

export default MyProfile;
