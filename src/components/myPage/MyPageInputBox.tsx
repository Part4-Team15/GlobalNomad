import { MyPageInputBoxProps } from '@/types/myProfile';
import MyPageInputLabel from './MyPageInputLabel';

const MyPageInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  inputType,
  editProfileErrorMessages,
  setEditProfileErrorMessages,
  onFocusOut,
  placeholder,
}: MyPageInputBoxProps) => {
  let borderColorClass = '';
  const disabled = inputType === 'email';

  const onClickInput = () => {
    if (setEditProfileErrorMessages) {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        [`${inputName}ErrorMessage`]: '',
      }));
    }
  };

  if (inputName === 'nickname' && editProfileErrorMessages?.nicknameErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (inputName === 'newPassword' && editProfileErrorMessages?.newPasswordErrorMessage) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'newPasswordConfirm' &&
    editProfileErrorMessages?.newPasswordConfirmErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  }

  return (
    <div className="flex flex-col gap-4">
      <MyPageInputLabel labelName={labelName} inputName={inputName} />
      <input
        className={`py-4 pl-4 border border-gray-50 rounded ${borderColorClass} outline-none focus:border-blue-500 dark:bg-darkMode-black-20 dark:text-darkMode-white-10`}
        type={inputType}
        id={inputName}
        onChange={onChangeInput}
        value={value}
        name={inputName}
        onClick={onClickInput}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={inputName === 'newPasswordConfirm' ? onFocusOut : undefined}
      />
      {inputName === 'nickname' && editProfileErrorMessages?.nicknameErrorMessage && (
        <div className="text-red-40 text-xs ml-1 dark:text-darkMode-white-10">
          <p>{editProfileErrorMessages.nicknameErrorMessage}</p>
        </div>
      )}

      {inputName === 'newPassword' && editProfileErrorMessages?.newPasswordErrorMessage && (
        <div className="text-red-40 text-xs ml-1 dark:text-darkMode-white-10">
          <p>{editProfileErrorMessages.newPasswordErrorMessage}</p>
        </div>
      )}
      {inputName === 'newPasswordConfirm' &&
        editProfileErrorMessages?.newPasswordConfirmErrorMessage && (
          <div className="text-red-40 text-xs ml-1 dark:text-darkMode-white-10">
            <p>{editProfileErrorMessages.newPasswordConfirmErrorMessage}</p>
          </div>
        )}
    </div>
  );
};

export default MyPageInputBox;
