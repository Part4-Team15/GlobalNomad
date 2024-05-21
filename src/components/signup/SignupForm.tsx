import { ChangeEvent, FormEvent, useState } from 'react';

import { AxiosError } from 'axios';
import axios from '../../lib/axios';

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
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">아이디</label>
          <input name="email" type="email" id="email" onChange={onChangeInput} value={email} />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input name="nickname" type="text" id="nickname" onChange={onChangeInput} value={nickname} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" id="password" onChange={onChangeInput} value={password} />
        </div>
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default SignupForm;
