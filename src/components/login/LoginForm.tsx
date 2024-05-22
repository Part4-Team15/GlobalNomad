import { ChangeEvent, FormEvent, useState } from 'react';

import handleLogin from '../../api/handleLogin';
import AuthInputBox from '../common/AuthInputBox';
import AuthButton from '../common/AuthButton';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7 w-[40rem] mx-auto">
      <AuthInputBox
        inputName="email"
        onChangeInput={onChangeInput}
        value={email}
        labelName="이메일"
      />
      <AuthInputBox
        inputName="password"
        onChangeInput={onChangeInput}
        value={password}
        labelName="비밀번호"
      />
      <AuthButton>로그인</AuthButton>
    </form>
  );
};

export default LoginForm;
