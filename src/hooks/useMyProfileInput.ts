import { useState, ChangeEvent } from 'react';

const useMyProfileInput = () => {
  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return { inputs, setInputs, onChangeInput };
};

export default useMyProfileInput;
