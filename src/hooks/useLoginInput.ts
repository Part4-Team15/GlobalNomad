import { useState, ChangeEvent } from 'react';

const useLoginInput = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return { inputs, onChangeInput };
};

export default useLoginInput;
