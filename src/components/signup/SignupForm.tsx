import { ChangeEvent, FormEvent, useState } from 'react';

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    id: '',
    nickname: '',
    password: '',
  });

  const { id, nickname, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input name="id" type="text" id="id" onChange={onChangeInput} value={id} />
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
