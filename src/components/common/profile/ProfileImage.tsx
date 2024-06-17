import React, { ChangeEvent } from 'react';
import uploadProfileImage from '@/api/uploadProfileImage';

import { ProfileImageProps } from '@/types/myPageProfile';
import { useLocation } from 'react-router-dom';
import DefaultMyPageProfileImage from './DefaultMyPageProfileImage';

const ProfileImage = ({
  nickname,
  profileImageUrl,
  uploadedImage = null,
  setUploadedImage = () => null,
  isShowDefaultImage,
  setIsShowDefaultImage,
}: ProfileImageProps) => {
  const location = useLocation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsShowDefaultImage(false);
    if (file) {
      try {
        const imageData = await uploadProfileImage(file);
        setUploadedImage(imageData.profileImageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };
  const handlePenClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  if (!profileImageUrl && !uploadedImage) {
    return (
      <DefaultMyPageProfileImage
        nickname={nickname}
        setUploadedImage={setUploadedImage}
        setIsShowDefaultImage={setIsShowDefaultImage}
      />
    );
  }

  const handleDeleteProfileImage = () => {
    setUploadedImage(null);
    setIsShowDefaultImage(true);
  };

  return (
    <div>
      {isShowDefaultImage === true ? (
        <DefaultMyPageProfileImage
          nickname={nickname}
          setUploadedImage={setUploadedImage}
          setIsShowDefaultImage={setIsShowDefaultImage}
        />
      ) : (
        <div
          className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${uploadedImage || profileImageUrl})`,
            backgroundColor: '#E3E5E8',
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

          {location.pathname === '/my/profile' && (
            <button type="button" onClick={handleDeleteProfileImage}>
              <img src="/assets/remove_profile_icon.svg" alt="remove_profile_icon" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
