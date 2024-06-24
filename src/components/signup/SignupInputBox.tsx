import { useState } from 'react';

import { SignupInputBoxProps } from '@/types/signupPage';
import AuthLabel from '../common/auth/AuthLabel';

const SignupInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  signupErrorMessages,
  setSignupErrorMessages,
  placeholder
}: SignupInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [inputType, setInputType] = useState(
    inputName.includes('password') ? 'password' : inputName,
  );
  const onClickInput = () => {
    setSignupErrorMessages((prev) => ({
      ...prev,
      [`${inputName}ErrorMessage`]: '',
    }));
  };
  const onClickEyeIcon = () => {
    if (inputType.includes('password')) {
      setInputType('text');
    } else if (inputType === 'text') {
      setInputType('password');
    }
    setIsShowInputValue((prev) => !prev);
  };
  let borderColorClass = '';
  if (inputName === 'email' && signupErrorMessages?.emailErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'nickname' && signupErrorMessages?.nicknameErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'password' && signupErrorMessages?.passwordErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'passwordConfirm' && signupErrorMessages?.passwordConfirmErrorMessage) {
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
          placeholder={placeholder}
        />
        {labelName.includes('비밀번호') === true ? (
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
      {inputName === 'email' && signupErrorMessages?.emailErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{signupErrorMessages.emailErrorMessage}</div>
      )}
      {inputName === 'nickname' && signupErrorMessages?.nicknameErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{signupErrorMessages.nicknameErrorMessage}</div>
      )}

      {inputName === 'password' && signupErrorMessages?.passwordErrorMessage && (
        <div className="text-red-40 text-xs ml-1">{signupErrorMessages.passwordErrorMessage}</div>
      )}
      {inputName === 'passwordConfirm' && signupErrorMessages?.passwordConfirmErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {signupErrorMessages.passwordConfirmErrorMessage}
        </div>
      )}
    </div>
  );
};

export default SignupInputBox;
