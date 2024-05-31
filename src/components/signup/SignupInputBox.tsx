import { ChangeEvent, useState } from 'react';

import { SignupErrorType } from '@/types/signupPage';
import AuthLabel from '../common/AuthLabel';

interface SignupInputBoxProps {
  inputName: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  inputType: string;
  signupErrorMessage: SignupErrorType | null;
  setSignupErrorMessage: React.Dispatch<React.SetStateAction<SignupErrorType>>;
}

const SignupInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  inputType,
  signupErrorMessage,
  setSignupErrorMessage,
}: SignupInputBoxProps) => {
  const [isShowInputValue, setIsShowInputValue] = useState(false);
  const [changeInputType, setChangeInputType] = useState(inputType);

  const onClickInput = () => {
    if (inputName === 'email') {
      setSignupErrorMessage((prev) => ({
        ...prev,
        emailErrorMessage: null,
      }));
    } else if (inputName === 'nickname') {
      setSignupErrorMessage((prev) => ({
        ...prev,
        nicknameErrorMessage: null,
      }));
    } else if (inputName === 'password') {
      setSignupErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: null,
      }));
    } else if (inputName === 'passwordConfirm') {
      setSignupErrorMessage((prev) => ({
        ...prev,
        passwordConfirmErrorMessage: null,
      }));
    }
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
  if (inputName === 'email' && signupErrorMessage?.emailErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'nickname' &&
    signupErrorMessage?.nicknameErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'password' &&
    signupErrorMessage?.passwordErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'passwordConfirm' &&
    signupErrorMessage?.passwordConfirmErrorMessage
  ) {
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
      {inputName === 'email' && signupErrorMessage?.emailErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {signupErrorMessage.emailErrorMessage}
        </div>
      )}
      {inputName === 'nickname' && signupErrorMessage?.nicknameErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {signupErrorMessage.nicknameErrorMessage}
        </div>
      )}

      {inputName === 'password' && signupErrorMessage?.passwordErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {signupErrorMessage.passwordErrorMessage}
        </div>
      )}
      {inputName === 'passwordConfirm' &&
        signupErrorMessage?.passwordConfirmErrorMessage && (
          <div className="text-red-40 text-xs ml-1">
            {signupErrorMessage.passwordConfirmErrorMessage}
          </div>
      )}
    </div>
  );
};

export default SignupInputBox;
