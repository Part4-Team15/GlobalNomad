import { ChangeEvent, FormEvent, useState } from 'react';

import { AxiosError } from 'axios';
import axios from '../../lib/axiosInstance';

import AuthButton from '../common/AuthButton';
import SignupInputBox from './SignupInputBox';

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const { email, nickname, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/users', { email, nickname, password });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('에러 발생:', error.message);
      } else {
        console.error('에러 발생:', error);
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-7 w-[40rem] mx-auto"
      >
        <SignupInputBox
          inputName="email"
          onChangeInput={onChangeInput}
          value={email}
          labelName="이메일"
        />
        <SignupInputBox
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
        />
        <SignupInputBox
          inputName="password"
          onChangeInput={onChangeInput}
          value={password}
          labelName="비밀번호"
        />
        <AuthButton>회원가입</AuthButton>
      </form>
    </div>
  );
};

export default SignupForm;
