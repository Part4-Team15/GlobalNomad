import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { EditProfileResponse, EditProfileErrorMessages } from '@/types/myProfile';
import editMyInformation, { EditMyInformationParams } from '@/api/editMyInformation';
import queryClient from '@/lib/queryClient';

interface ErrorResponse {
  message: string;
}

const useEditProfile = () => {
  const [editProfileErrorMessages, setEditProfileErrorMessages] =
    useState<EditProfileErrorMessages>({
      nicknameErrorMessage: '',
      newPasswordErrorMessage: '',
      newPasswordConfirmErrorMessage: '',
    });
  const mutation = useMutation<EditProfileResponse, AxiosError, EditMyInformationParams>({
    mutationFn: editMyInformation,
    onSuccess: () => {
      // 회원정보 수정 성공시
      setEditProfileErrorMessages({
        nicknameErrorMessage: '',
        newPasswordErrorMessage: '',
        newPasswordConfirmErrorMessage: '',
      });

      toast.success('내 정보 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ErrorResponse;
        const errorStatus = error.response.status;
        const errorMessage = errorData.message;
        if (errorStatus === 400) {
          if (errorMessage.includes('닉네임')) {
            setEditProfileErrorMessages((prev) => ({
              ...prev,
              nicknameErrorMessage: errorMessage,
            }));
          } else if (errorMessage.includes('비밀번호')) {
            setEditProfileErrorMessages((prev) => ({
              ...prev,
              newPasswordErrorMessage: errorMessage,
            }));
          } else if (errorMessage.includes('형식')) {
            toast.error(errorMessage);
          } else if (errorMessage.includes('없습니다')) {
            setEditProfileErrorMessages((prev) => ({
              ...prev,
              nicknameErrorMessage: errorMessage,
            }));
          }
        }
      } else {
        setEditProfileErrorMessages((prev) => ({ ...prev, emailErrorMessage: error.message }));
      }
    },
  });

  return { mutation, editProfileErrorMessages, setEditProfileErrorMessages };
};

export default useEditProfile;
