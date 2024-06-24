import { ChangeEvent, useState } from 'react';
import { LoginErrorMessages } from '@/hooks/useLogin';
import AuthLabel from '../common/auth/AuthLabel';

interface AuthInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  loginErrorMessages: LoginErrorMessages;
  setLoginErrorMessages: React.Dispatch<React.SetStateAction<LoginErrorMessages>>;
}

const LoginInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  loginErrorMessages,
  setLoginErrorMessages,
}: AuthInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [inputType, setInputType] = useState(inputName);

  const onClickInput = () => {
    setLoginErrorMessages((prev) => ({
      ...prev,
      [`${inputName}ErrorMessage`]: '',
    }));
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
  if (inputName === 'email' && loginErrorMessages?.emailErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'password' && loginErrorMessages?.passwordErrorMessage) {
    borderColorClass = 'border-red-40';
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <AuthLabel labelName={labelName} inputName={inputName} />
      <div className="relative">
        <input
          name={inputName}
          type={inputType}
          id={inputName}
          onChange={onChangeInput}
          value={value}
          className={`border border-gray-60 rounded-[6px] px-5 py-4 focus:outline-none w-full ${borderColorClass} focus:border-blue-500 dark:bg-darkMode-black-20 dark:text-darkMode-white-10`}
          onClick={onClickInput}
          placeholder={inputName === 'email' ? '이메일을 입력해주세요' : '비밀번호를 입력해 주세요'}
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
      {inputName === 'email' && loginErrorMessages?.emailErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{loginErrorMessages.emailErrorMessage}</div>
      )}
      {inputName === 'password' && loginErrorMessages?.passwordErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{loginErrorMessages.passwordErrorMessage}</div>
      )}
    </div>
  );
};

export default LoginInputBox;
