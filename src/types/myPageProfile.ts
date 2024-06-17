export interface MyPageProfileProps {
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
  isShowProfileForm: boolean;
  setIsShowProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileImageProps {
  nickname: string;
  profileImageUrl: string;
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
}
