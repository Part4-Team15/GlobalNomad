import { ChangeEvent, useState } from 'react';
import { LoginErrorType } from '@/types/loginPage';
import AuthLabel from '../common/auth/AuthLabel';

interface AuthInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  errorData: LoginErrorType | null;
  setErrorData: React.Dispatch<React.SetStateAction<LoginErrorType>>;
}

const LoginInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  errorData,
  setErrorData,
}: AuthInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [inputType, setInputType] = useState(inputName);

  const onClickInput = () => {
    if (inputName === 'email') {
      setErrorData((prev) => ({
        ...prev,
        emailErrorMessage: null,
      }));
    } else {
      setErrorData((prev) => ({
        ...prev,
        passwordErrorMessage: null,
      }));
    }
  };
  const onClickEyeIcon = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else if (inputType === 'text') {
      setInputType('password');
    }
    setIsShowInputValue((prev) => !prev);
  };

  let borderColorClass = '';
  if (inputName === 'email' && errorData?.emailErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'password' && errorData?.passwordErrorMessage) {
    borderColorClass = 'border-red-40';
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <AuthLabel labelName={labelName} />
      <div className="relative">
        <input
          name={inputName}
          type={inputType}
          id={inputName}
          onChange={onChangeInput}
          value={value}
          className={`border border-gray-60 rounded-[6px] px-5 py-4 focus:outline-none w-full ${borderColorClass}`}
          onClick={onClickInput}
        />
        {labelName === '비밀번호' && (
          <button
            onClick={onClickEyeIcon}
            type="button"
            className="text-[0px] absolute top-1/2 right-[20px] transform -translate-y-1/2"
          >
            <img
              src={
                isShowInputValue === true
                  ? '/assets/visibility_on_btn.svg'
                  : '/assets/visibility_off_btn.svg'
              }
              alt={isShowInputValue === true ? 'open_eye' : 'close_eye'}
              className="w-[24px] h-[24px]"
            />
          </button>
        )}
      </div>
      {inputName === 'email' && errorData?.emailErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{errorData.emailErrorMessage}</div>
      )}
      {inputName === 'password' && errorData?.passwordErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{errorData.passwordErrorMessage}</div>
      )}
    </div>
  );
};

export default LoginInputBox;
