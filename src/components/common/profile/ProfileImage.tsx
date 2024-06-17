import React, { ChangeEvent } from 'react';
import uploadProfileImage from '@/api/uploadProfileImage';

import { ProfileImageProps } from '@/types/myPageProfile';
import { useLocation } from 'react-router-dom';
import InformationNoImage from './InformationNoProfileImage';

const ProfileImage = ({
  nickname,
  profileImageUrl,
  uploadedImage = null,
  setUploadedImage = () => null,
}: ProfileImageProps) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageData = await uploadProfileImage(file);
        setUploadedImage(imageData.profileImageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };
  const location = useLocation();
  const handlePenClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  if (!profileImageUrl && !uploadedImage) {
    return (
      <InformationNoImage
        nickname={nickname}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
    );
  }

  return (
    <div
      className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${uploadedImage || profileImageUrl})`,
        backgroundColor: '#E3E5E8',
        backgroundSize: 'contain',
      }}
    >
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />

      {location.pathname === '/my/profile' && (
        <div
          className="absolute p-[10px] w-11 h-11 inline-flex items-start bottom-0 right-3 z-10 rounded-full bg-green-80 cursor-pointer"
          onClick={handlePenClick}
        >
          <img className="w-6 h-6" src="/assets/pen_icon.svg" alt="penIcon" />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
