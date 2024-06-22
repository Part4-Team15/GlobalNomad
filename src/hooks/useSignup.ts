import handleSignup from '@/api/handleSignup';
import { HandleSignupParams, UserProfile, SignupErrorMessages } from '@/types/signupPage';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ErrorResponse {
  message: string;
}

const useSignup = () => {
  const [signupErrorMessages, setSignupErrorMessages] = useState<SignupErrorMessages>({
    emailErrorMessage: '',
    nicknameErrorMessage: '',
    passwordErrorMessage: '',
    passwordConfirmErrorMessage: '',
  });

  const navigate = useNavigate();
  const mutation = useMutation<UserProfile, AxiosError, HandleSignupParams>({
    mutationFn: handleSignup,
    onSuccess: () => {
      // 회원가입 성공 시 에러 메시지 초기화
      setSignupErrorMessages({
        emailErrorMessage: '',
        nicknameErrorMessage: '',
        passwordErrorMessage: '',
        passwordConfirmErrorMessage: '',
      });

      // 회원가입 성공후 알림, 로그인 페이지로 이동
      navigate('/login');
      toast.success('회원가입에 성공 했습니다!', {
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
            setSignupErrorMessages((prev) => ({ ...prev, emailErrorMessage: errorMessage }));
          } else if (errorMessage.includes('닉네임')) {
            setSignupErrorMessages((prev) => ({ ...prev, nicknameErrorMessage: errorMessage }));
          } else if (errorMessage.includes('비밀번호')) {
            setSignupErrorMessages((prev) => ({ ...prev, passwordErrorMessage: errorMessage }));
          }
        } else if (errorStatus === 409) {
          setSignupErrorMessages((prev) => ({ ...prev, emailErrorMessage: errorMessage }));
        }
      } else {
        setSignupErrorMessages((prev) => ({ ...prev, emailErrorMessage: error.message }));
      }
    },
  });

  return { mutation, signupErrorMessages, setSignupErrorMessages };
};

export default useSignup;
