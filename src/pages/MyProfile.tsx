import React from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import { useOutletContext } from 'react-router-dom';

interface OutletProps {
  uploadedImage: string | null;
}
const MyProfile = () => {
  const { uploadedImage } = useOutletContext<OutletProps>();
  return <MyPageForm uploadedImage={uploadedImage} />;
};

export default MyProfile;
