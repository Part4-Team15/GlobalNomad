export interface MyPageProfileProps {
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
  isShowProfileForm: boolean;
  setIsShowProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDefaultImage: boolean;
  setIsShowDefaultImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileImageProps {
  nickname: string;
  profileImageUrl: string;
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
  isShowDefaultImage: boolean;
  setIsShowDefaultImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PageMenuProps {
  linkTo: string;
  icon: any;
  activeIcon: any;
  name: string;
  setIsShowProfileForm?: React.Dispatch<React.SetStateAction<boolean>>;
}
