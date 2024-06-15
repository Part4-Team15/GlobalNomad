import { ChangeEvent, useState } from 'react';

import { SignupErrorMessages } from '@/types/signupPage';
import AuthLabel from '../common/auth/AuthLabel';

interface SignupInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  inputType: string;
  signupErrorMessages: SignupErrorMessages;
  setSignupErrorMessages: React.Dispatch<React.SetStateAction<SignupErrorMessages>>;
}

const SignupInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  inputType,
  signupErrorMessages,
  setSignupErrorMessages,
}: SignupInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [changeInputType, setChangeInputType] = useState(inputType);

  const onClickInput = () => {
    setSignupErrorMessages((prev) => ({
      ...prev,
      [`${inputName}ErrorMessage`]: '',
    }));
  };
  const onClickEyeIcon = () => {
    if (labelName.includes('비밀번호')) {
      setChangeInputType('text');
    } else if (inputType === 'text') {
      setChangeInputType('password');
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
      <AuthLabel labelName={labelName} />
      <div className="relative">
        <input
          name={inputName}
          type={changeInputType}
          id={inputName}
          onChange={onChangeInput}
          value={value}
          className={`border border-gray-60 rounded-[6px] px-5 py-4 focus:outline-none w-full ${borderColorClass}`}
          onClick={onClickInput}
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

      {inputName === 'passwordConfirm' && signupErrorMessages?.passwordConfirmErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {signupErrorMessages.passwordConfirmErrorMessage}
        </div>
      )}
    </div>
  );
};

export default SignupInputBox;
