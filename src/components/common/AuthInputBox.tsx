import { ChangeEvent, useState } from 'react';
import AuthLabel from './AuthLabel';

interface AuthInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
}

const AuthInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
}: AuthInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [inputType, setInputType] = useState(inputName);
  const onClickEyeIcon = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else if (inputType === 'text') {
      setInputType('password');
    }
    setIsShowInputValue((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <AuthLabel labelName={labelName} />
      <input
        name={inputName}
        type={inputType}
        id={inputName}
        onChange={onChangeInput}
        value={value}
        className="border border-gray-60 rounded-[6px] px-5 py-4 focus:outline-none"
      />
      {labelName === '비밀번호' ? (
        <button
          onClick={onClickEyeIcon}
          type="button"
          className="text-[0px] absolute bottom-[16px] right-[20px]"
        >
          <img
            src={
              isShowInputValue === true
                ? '/assets/visibility_on_btn.svg'
                : '/assets/visibility_off_btn.svg'
            }
            alt="arrow_image"
            className="w-[24px] h-[24px]"
          />
        </button>
      ) : null}
    </div>
  );
};

export default AuthInputBox;
