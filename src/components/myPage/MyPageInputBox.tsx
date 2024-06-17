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
}: MyPageInputBoxProps) => {
  let borderColorClass = '';
  const readOnly = inputType === 'email';

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
        className={`py-4 pl-4 border border-gray-50 rounded ${borderColorClass} outline-none focus:border-blue-500 `}
        type={inputType}
        id={inputName}
        onChange={onChangeInput}
        value={value}
        name={inputName}
        onClick={onClickInput}
        readOnly={readOnly}
        onBlur={inputName === 'newPasswordConfirm' ? onFocusOut : undefined}
      />
      {inputName === 'nickname' && editProfileErrorMessages?.nicknameErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {editProfileErrorMessages.nicknameErrorMessage}
        </div>
      )}

      {inputName === 'newPassword' && editProfileErrorMessages?.newPasswordErrorMessage && (
        <div className="text-red-40 text-xs ml-1">
          {editProfileErrorMessages.newPasswordErrorMessage}
        </div>
      )}
      {inputName === 'newPasswordConfirm' &&
        editProfileErrorMessages?.newPasswordConfirmErrorMessage && (
          <div className="text-red-40 text-xs ml-1">
            {editProfileErrorMessages.newPasswordConfirmErrorMessage}
          </div>
        )}
    </div>
  );
};

export default MyPageInputBox;
