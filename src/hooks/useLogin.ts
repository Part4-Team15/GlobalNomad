import { useMutation } from '@tanstack/react-query';
import handleLogin, { HandleLoginParams, LoginDataResponse } from '@/api/handleLogin';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface ErrorResponse {
  message: string;
}

export interface LoginErrorMessages {
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

const useLogin = () => {
  const [loginErrorMessages, setLoginErrorMessages] = useState<LoginErrorMessages>({
    emailErrorMessage: '',
    passwordErrorMessage: '',
  });

  const mutation = useMutation<LoginDataResponse, AxiosError, HandleLoginParams>({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      console.log(data);
      // 로그인 성공 시 에러 메시지 초기화
      setLoginErrorMessages({ emailErrorMessage: '', passwordErrorMessage: '' });
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ErrorResponse;
        const errorStatus = error.response.status;
        const errorMessage = errorData.message;
        if (errorStatus === 400) {
          if (errorMessage.includes('이메일')) {
            setLoginErrorMessages((prev) => ({ ...prev, emailErrorMessage: errorMessage }));
          } else if (errorMessage.includes('비밀번호')) {
            setLoginErrorMessages((prev) => ({ ...prev, passwordErrorMessage: errorMessage }));
          }
        }
      } else {
        setLoginErrorMessages((prev) => ({ ...prev, emailErrorMessage: error.message }));
      }
    },
  });

  return { mutation, loginErrorMessages, setLoginErrorMessages };
};

export default useLogin;
