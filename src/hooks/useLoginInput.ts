// useLoginInput.ts (예시)
import { useState } from 'react';

const useLoginInput = (initialValues = { email: '', password: '' }) => {
  const [inputs, setInputs] = useState(initialValues);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { inputs, onChangeInput };
};

export default useLoginInput;
