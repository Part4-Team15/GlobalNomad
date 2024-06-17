import { ChangeEvent } from 'react';

export interface EditProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyPageInputBoxProps {
  inputName: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  inputType: string;
  editProfileErrorMessages?: EditProfileErrorMessages;
  setEditProfileErrorMessages?: React.Dispatch<React.SetStateAction<EditProfileErrorMessages>>;
  onFocusOut?: () => void;
  placeholder?: string;
}

export interface EditProfileErrorMessages {
  nicknameErrorMessage: string;
  newPasswordErrorMessage: string;
  newPasswordConfirmErrorMessage: string;
}
