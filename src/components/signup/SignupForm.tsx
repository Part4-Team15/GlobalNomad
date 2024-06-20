import { FormEvent } from 'react';

import useSignupInput from '@/hooks/useSignupInput';
import useSignup from '@/hooks/useSignup';

import SignupInputBox from './SignupInputBox';
import SignupSubmitButton from './SignupSubmitButton';

const SignupForm = () => {
  // custom hook
  const { inputs, onChangeInput } = useSignupInput();

  const { email, nickname, password, passwordConfirm } = inputs;

  const { mutation, signupErrorMessages, setSignupErrorMessages } = useSignup();
  const { mutate } = mutation;

  const isButtonDisabled = !email || !nickname || !password || !passwordConfirm;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      password !== passwordConfirm &&
      emailRegex.test(email) &&
      password.length >= 8 &&
      nickname.length < 10
    ) {
      setSignupErrorMessages((prev) => ({
        ...prev,
        passwordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }
    mutate({ email, nickname, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-7 w-[40rem] mx-auto mt-[40px] md:w-[640px] sm:w-[350px] sm:mt-6"
      noValidate
    >
      <SignupInputBox
        inputName="email"
        onChangeInput={onChangeInput}
        value={email}
        labelName="이메일"
        signupErrorMessages={signupErrorMessages}
        setSignupErrorMessages={setSignupErrorMessages}
        placeholder="이메일을 입력해 주세요"
      />
      <SignupInputBox
        inputName="nickname"
        onChangeInput={onChangeInput}
        value={nickname}
        labelName="닉네임"
        signupErrorMessages={signupErrorMessages}
        setSignupErrorMessages={setSignupErrorMessages}
        placeholder="닉네임을 입력해 주세요"
      />
      <SignupInputBox
        inputName="password"
        onChangeInput={onChangeInput}
        value={password}
        labelName="비밀번호"
        signupErrorMessages={signupErrorMessages}
        setSignupErrorMessages={setSignupErrorMessages}
        placeholder="8자 이상 입력해 주세요"
      />
      <SignupInputBox
        inputName="passwordConfirm"
        onChangeInput={onChangeInput}
        value={passwordConfirm}
        labelName="비밀번호 확인"
        signupErrorMessages={signupErrorMessages}
        setSignupErrorMessages={setSignupErrorMessages}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />
      <SignupSubmitButton disabled={isButtonDisabled}>회원가입</SignupSubmitButton>
    </form>
  );
};

export default SignupForm;
