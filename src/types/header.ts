export interface UserInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeaderProfileImageProps {
  nickname: string;
  profileImageUrl: string;
}
