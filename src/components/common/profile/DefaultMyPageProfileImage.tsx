import React, { ChangeEvent, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import uploadProfileImage from '@/api/uploadProfileImage';
import { DefaultMyPageProfileImageProps } from '@/types/myPageProfile';
import { useLocation } from 'react-router-dom';
import Toast from '@/utils/Toast';

const DefaultMyPageProfileImage = ({
  nickname,
  setUploadedImage = () => null,
  setIsShowDefaultImage,
}: DefaultMyPageProfileImageProps) => {
  const nicknameInitial = nickname[0];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const mutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setUploadedImage(data.profileImageUrl);
      setIsShowDefaultImage(false);
    },
    onError: () => {
      Toast.error('이미지 업로드에 실패했습니다. 파일 크기를 확인하세요.');
    },
  });

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className="relative w-40 h-40 bg-slate-400 rounded-full flex items-center justify-center text-white">
      <span className="text-[80px]">{nicknameInitial}</span>

      {location.pathname === '/my/profile' && (
        <button
          type="button"
          onClick={handleFileInputClick}
          className="absolute p-[10px] w-11 h-11 inline-flex items-start top-[115px] right-3 z-10 rounded-full bg-green-80 cursor-pointer"
        >
          <img className="w-6 h-6" src="/assets/pen_icon.svg" alt="penIcon" />
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={onChangeImage}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default DefaultMyPageProfileImage;
