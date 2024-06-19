import { useState, ChangeEvent } from 'react';

const useSignupInput = () => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return { inputs, onChangeInput };
};

export default useSignupInput;
