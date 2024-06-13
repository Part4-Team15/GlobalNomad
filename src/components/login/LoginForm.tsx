import { FormEvent } from 'react';
import useLoginInput from '@/hooks/useLoginInput';
import useLogin from '@/hooks/useLogin';
import AuthButton from '../common/auth/AuthButton';
import LoginInputBox from './LoginInputBox';

const LoginForm = () => {
  // custom hook
  const { inputs, onChangeInput } = useLoginInput();

  const { email, password } = inputs;

  // // 이메일 정규식
  // const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  // // 비밀번호 최소길이
  // const PASSWORD_MIN_LENGTH = 8;

  const { mutation, loginErrorMessages, setLoginErrorMessages } = useLogin();
  const { mutate } = mutation;
  // const { mutate } = useMutation({
  //   mutationFn: handleLogin,
  //   onSuccess: (data) => {
  //     const { accessToken, refreshToken } = data;
  //     setErrorData({
  //       emailErrorMessage: null,
  //       passwordErrorMessage: null,
  //       unexpectedErrorMessage: null,
  //     });
  //     localStorage.setItem('accessToken', accessToken);
  //     localStorage.setItem('refreshToken', refreshToken);
  //   },
  //   onError: (error: AxiosError) => {
  //     if (error.response) {
  //       if (error.response.status === 404) {
  //         if (password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
  //           setErrorData((prev) => ({
  //             ...prev,
  //             passwordErrorMessage: '8자 이상 작성해 주세요.',
  //             emailErrorMessage: null,
  //           }));
  //         } else {
  //           setErrorData({
  //             emailErrorMessage: '존재하지 않는 유저입니다.',
  //             passwordErrorMessage: null,
  //             unexpectedErrorMessage: null,
  //           });
  //         }
  //       } else if (error.response.status === 400) {
  //         if (password.length >= 8 && emailRegex.test(email)) {
  //           setErrorData((prev) => ({
  //             ...prev,
  //             emailErrorMessage: null,
  //             passwordErrorMessage: '비밀번호가 일치하지 않습니다.',
  //           }));
  //         } else {
  //           if (password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               passwordErrorMessage: '8자 이상 작성해 주세요.',
  //             }));
  //           } else if (password.length === 0) {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               passwordErrorMessage: '비밀번호를 입력해주세요.',
  //             }));
  //           } else {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               passwordErrorMessage: null,
  //             }));
  //           }

  //           // 이메일 확인
  //           if (email.length === 0) {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               emailErrorMessage: '이메일을 입력해주세요',
  //             }));
  //           } else if (!emailRegex.test(email)) {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               emailErrorMessage: '이메일 형식으로 작성해주세요.',
  //             }));
  //           } else {
  //             setErrorData((prev) => ({
  //               ...prev,
  //               emailErrorMessage: null,
  //             }));
  //           }
  //         }
  //       }
  //     }
  //   },
  // });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7 w-[40rem] mx-auto" noValidate>
      <LoginInputBox
        inputName="email"
        onChangeInput={onChangeInput}
        value={email}
        labelName="이메일"
        loginErrorMessages={loginErrorMessages}
        setLoginErrorMessages={setLoginErrorMessages}
      />

      <LoginInputBox
        inputName="password"
        onChangeInput={onChangeInput}
        value={password}
        labelName="비밀번호"
        loginErrorMessages={loginErrorMessages}
        setLoginErrorMessages={setLoginErrorMessages}
      />

      <AuthButton>로그인</AuthButton>
    </form>
  );
};

export default LoginForm;
