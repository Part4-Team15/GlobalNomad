import { useMutation } from '@tanstack/react-query';
import handleLogin, { HandleLoginParams, LoginDataResponse } from '@/api/handleLogin';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const navigate = useNavigate();
  const mutation = useMutation<LoginDataResponse, AxiosError, HandleLoginParams>({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      console.log(data);
      // 로그인 성공 시 에러 메시지 초기화
      setLoginErrorMessages({ emailErrorMessage: '', passwordErrorMessage: '' });

      // 엑세스 토큰 ,리프레쉬 토큰 로컬 스토리지에 저장
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success('로그인에 성공했습니다!', {
        onClose: () => navigate('/'),
        autoClose: 2000,
      });
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
        } else {
          setLoginErrorMessages((prev) => ({ ...prev, emailErrorMessage: errorMessage }));
        }
      } else {
        setLoginErrorMessages((prev) => ({ ...prev, emailErrorMessage: error.message }));
      }
    },
  });

  return { mutation, loginErrorMessages, setLoginErrorMessages };
};

export default useLogin;
