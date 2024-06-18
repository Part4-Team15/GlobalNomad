import React from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import { useOutletContext } from 'react-router-dom';

interface OutletProps {
  uploadedImage: string | null;
  isMyProfilePage: boolean;
}
const MyProfile = () => {
  const { uploadedImage, isMyProfilePage } = useOutletContext<OutletProps>();
  return <MyPageForm uploadedImage={uploadedImage} isMyProfilePage={isMyProfilePage} />;
};

export default MyProfile;
