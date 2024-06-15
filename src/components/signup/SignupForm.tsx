import { FormEvent } from 'react';

import useSignupInput from '@/hooks/useSignupInput';
import useSignup from '@/hooks/useSignup';
import AuthButton from '../common/auth/AuthButton';
import SignupInputBox from './SignupInputBox';

const SignupForm = () => {
  // custom hook
  const { inputs, onChangeInput } = useSignupInput();

  const { email, nickname, password, passwordConfirm } = inputs;

  const { mutation, signupErrorMessages, setSignupErrorMessages } = useSignup();
  const { mutate } = mutation;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ email, nickname, password });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7 w-[40rem] mx-auto" noValidate>
        <SignupInputBox
          inputName="email"
          onChangeInput={onChangeInput}
          value={email}
          labelName="이메일"
          inputType="email"
          signupErrorMessages={signupErrorMessages}
          setSignupErrorMessages={setSignupErrorMessages}
        />
        <SignupInputBox
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
          inputType="text"
          signupErrorMessages={signupErrorMessages}
          setSignupErrorMessages={setSignupErrorMessages}
        />
        <SignupInputBox
          inputName="password"
          onChangeInput={onChangeInput}
          value={password}
          labelName="비밀번호"
          inputType="password"
          signupErrorMessages={signupErrorMessages}
          setSignupErrorMessages={setSignupErrorMessages}
        />
        <SignupInputBox
          inputName="passwordConfirm"
          onChangeInput={onChangeInput}
          value={passwordConfirm}
          labelName="비밀번호 확인"
          inputType="password"
          signupErrorMessages={signupErrorMessages}
          setSignupErrorMessages={setSignupErrorMessages}
        />
        <AuthButton>회원가입</AuthButton>
      </form>
    </div>
  );
};

export default SignupForm;
