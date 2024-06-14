import { FormEvent } from 'react';
import useLoginInput from '@/hooks/useLoginInput';
import useLogin from '@/hooks/useLogin';
import AuthButton from '../common/auth/AuthButton';
import LoginInputBox from './LoginInputBox';

const LoginForm = () => {
  // custom hook
  const { inputs, onChangeInput } = useLoginInput();

  const { email, password } = inputs;

  // // 비밀번호 최소길이
  const PASSWORD_MIN_LENGTH = 8;
  const isButtonDisabled = !email || !password;

  const { mutation, loginErrorMessages, setLoginErrorMessages } = useLogin();
  const { mutate } = mutation;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < PASSWORD_MIN_LENGTH && loginErrorMessages.emailErrorMessage) {
      setLoginErrorMessages((prev) => ({
        ...prev,
        passwordErrorMessage: '8자 이상 작성해 주세요.',
      }));
      return;
    }
    mutate({ email, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-7 w-[40rem] mx-auto mt-[40px] md:w-[640px] sm:w-[350px] sm:mt-6"
      noValidate
    >
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

      <AuthButton disabled={isButtonDisabled}>로그인</AuthButton>
    </form>
  );
};

export default LoginForm;
