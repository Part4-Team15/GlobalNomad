import { useLocation } from 'react-router-dom';
import { MyPageProfileProps } from '@/types/myPageProfile';
import uploadProfileImage from '@/api/uploadProfileImage';
import { toast } from 'react-toastify';

import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import React, { ChangeEvent } from 'react';
import DefaultMyPageProfileImage from './DefaultMyPageProfileImage';
import MyPageProfileWithUrl from './MyPageProfileWithUrl';
import ProfileImageLayout from './ProfileImageLayout';

const MyPageProfile = ({
  uploadedImage = null,
  setUploadedImage,
  isShowProfileForm,
  setIsShowProfileForm,
  isShowDefaultImage,
  setIsShowDefaultImage,
}: MyPageProfileProps) => {
  const location = useLocation();

  const isPathNameMyProfile = location.pathname === '/my/profile';
  const isShowProfile = isPathNameMyProfile && !isShowProfileForm;

  const { userInfo, isLoading, isError } = useUserInfoQuery();

  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !userInfo) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsShowDefaultImage(false);
    if (file) {
      try {
        const imageData = await uploadProfileImage(file);
        setUploadedImage(imageData.profileImageUrl);
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다. 파일 크기를 확인하세요.');
      }
    }
  };

  const handleUploadImage = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  const handleDeleteProfileImage = () => {
    setUploadedImage(null);
    setIsShowDefaultImage(true);
  };

  if (!userInfo.profileImageUrl && !uploadedImage) {
    return (
      <ProfileImageLayout isShowProfile={isShowProfile} setIsShowProfileForm={setIsShowProfileForm}>
        <DefaultMyPageProfileImage
          nickname={userInfo.nickname}
          setUploadedImage={setUploadedImage}
          setIsShowDefaultImage={setIsShowDefaultImage}
        />
      </ProfileImageLayout>
    );
  }

  return (
    <ProfileImageLayout isShowProfile={isShowProfile} setIsShowProfileForm={setIsShowProfileForm}>
      {isShowDefaultImage === true ? (
        <DefaultMyPageProfileImage
          nickname={userInfo.nickname}
          setUploadedImage={setUploadedImage}
          setIsShowDefaultImage={setIsShowDefaultImage}
        />
      ) : (
        <MyPageProfileWithUrl
          uploadedImage={uploadedImage}
          profileImageUrl={userInfo.profileImageUrl}
          handleFileChange={handleFileChange}
          handleUploadImage={handleUploadImage}
          handleDeleteProfileImage={handleDeleteProfileImage}
        />
      )}
    </ProfileImageLayout>
  );
};
export default MyPageProfile;
