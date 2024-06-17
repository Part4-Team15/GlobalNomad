import { FormEvent, useEffect } from 'react';

import useMyProfileInput from '@/hooks/useMyProfileInput';
import useEditProfile from '@/hooks/useEditProfile';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import MyPageInputBox from './MyPageInputBox';

const MyPageForm = ({
  uploadedImage,
  isMyProfilePage,
}: {
  uploadedImage: string | null;
  isMyProfilePage: boolean;
}) => {
  const { inputs, setInputs, onChangeInput } = useMyProfileInput();

  const { nickname, email, newPassword, newPasswordConfirm } = inputs;

  const { mutation, editProfileErrorMessages, setEditProfileErrorMessages } = useEditProfile();
  const { mutate } = mutation;

  const { userInfo } = useUserInfoQuery();
  useEffect(() => {
    if (userInfo) {
      setInputs({
        nickname: userInfo.nickname,
        email: userInfo.email,
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [userInfo]);
  const newPasswordConfirmFocusOut = () => {
    if (inputs.newPassword !== inputs.newPasswordConfirm) {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '',
      }));
    }
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileImageUrl = uploadedImage ?? userInfo?.profileImageUrl ?? null;

    if (newPassword !== newPasswordConfirm && newPassword.length >= 8) {
      setEditProfileErrorMessages((prev) => ({
        ...prev,
        newPasswordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));

      return;
    }

    mutate({
      nickname,
      profileImageUrl,
      newPassword,
    });
  };

  return (
    <div
      className={`flex flex-col gap-4 ${isMyProfilePage ? '' : 'sm:hidden'} w-[729px] md:flex-grow sm:w-full`}
    >
      <div className="flex justify-between font-bold">
        <div className="text-[#1b1b1b] text-[32px]">내정보</div>
        <button
          type="submit"
          form="myPageForm"
          className="text-[16px] text-white bg-[#112211] px-8 py-[10px] rounded cursor-pointer"
        >
          저장하기
        </button>
      </div>
      <form className="flex flex-col gap-8" noValidate onSubmit={onSubmit} id="myPageForm">
        <MyPageInputBox
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
          inputType="text"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
        />
        <MyPageInputBox inputName="email" value={email} labelName="이메일" inputType="email" />
        <MyPageInputBox
          inputName="newPassword"
          onChangeInput={onChangeInput}
          value={newPassword}
          labelName="비밀번호"
          inputType="password"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
        />
        <MyPageInputBox
          inputName="newPasswordConfirm"
          onChangeInput={onChangeInput}
          value={newPasswordConfirm}
          labelName="비밀번호 재입력"
          inputType="password"
          editProfileErrorMessages={editProfileErrorMessages}
          setEditProfileErrorMessages={setEditProfileErrorMessages}
          onFocusOut={newPasswordConfirmFocusOut}
        />
      </form>
    </div>
  );
};

export default MyPageForm;
