import { ChangeEvent, FormEvent, useState } from 'react';

import { AxiosError } from 'axios';
import axios from '../../lib/axios';

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
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
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
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" id="password" onChange={onChangeInput} value={password} />
        </div>
        <button type="submit">로그인하기</button>
      </form>
    </div>
  );
};

export default LoginForm;
